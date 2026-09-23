export const SIMULATIONS_DATA = [
  {
    id: 'it-support',
    title: 'IT Support Simulation',
    icon: '🏢',
    domain: 'IT Infrastructure',
    difficulty: 'Medium',
    brief: 'A company branch cannot reach the internal intranet and file server. Users report "No Internet Access". Diagnose and restore network access.',
    steps: [
      {
        id: 's1',
        prompt: 'Check the client machine IP configuration by running a network inspection command.',
        commandToRun: 'ipconfig /all',
        output: `Ethernet adapter Local Area Connection:
   Connection-specific DNS Suffix  . : corp.internal
   Link-local IPv6 Address . . . . . : fe80::d51a:m54c%12
   IPv4 Address. . . . . . . . . . . : 169.254.89.21 (APIPA Detected!)
   Subnet Mask . . . . . . . . . . . : 255.255.0.0
   Default Gateway . . . . . . . . . : 0.0.0.0
   DHCP Server . . . . . . . . . . . : Not Reachable`,
        hint: 'Notice the 169.254.x.x address! This indicates APIPA auto-configuration because the DHCP server did not respond.',
        question: 'What is the root cause indicated by the 169.254.x.x IPv4 address?',
        options: [
          'The client has a static IP conflict',
          'DHCP lease failed, causing automatic APIPA assignment',
          'DNS cache is corrupted',
          'The network cable is unplugged'
        ],
        correctIndex: 1,
        explanation: '169.254.0.0/16 is Automatic Private IP Addressing (APIPA), assigned automatically by the OS when DHCP fails to provide an IP lease.'
      },
      {
        id: 's2',
        prompt: 'Release and renew the DHCP lease to request a valid IP from the router.',
        commandToRun: 'ipconfig /renew',
        output: `Renewing IP address...
Success!
   IPv4 Address. . . . . . . . . . . : 192.168.1.145
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.1.1
   DNS Servers . . . . . . . . . . . : 192.168.1.1`,
        hint: 'DHCP service renewed! Now verify reachability to the internal gateway.',
        question: 'Which command confirms connectivity to the Default Gateway?',
        options: [
          'ping 192.168.1.1',
          'nslookup google.com',
          'netstat -an',
          'tracert 8.8.8.8'
        ],
        correctIndex: 0,
        explanation: 'Pinging the default gateway (192.168.1.1) verifies the local network layer connectivity.'
      },
      {
        id: 's3',
        prompt: 'Verify DNS resolution and flush DNS cache.',
        commandToRun: 'ipconfig /flushdns',
        output: `Windows IP Configuration
Successfully flushed the DNS Resolver Cache.
Testing intranet.corp.internal -> Resolved to 192.168.1.10.
Network state: 100% ONLINE.`,
        hint: 'The connection is completely restored!',
        question: 'Why flush DNS cache after resolving network lease issues?',
        options: [
          'To clear old, stale, or negative cached DNS lookup records',
          'To restart the network adapter hardware',
          'To reset user passwords',
          'To re-encrypt network traffic'
        ],
        correctIndex: 0,
        explanation: 'Flushing the DNS resolver cache forces the machine to query the updated DNS server instead of serving stale or failed cached entries.'
      }
    ]
  },
  {
    id: 'networking',
    title: 'Networking Simulation',
    icon: '🌐',
    domain: 'Computer Networking',
    difficulty: 'Medium',
    brief: 'Diagnose intermittent packet drop and latency across a multi-hop route between the headquarters client, intermediate router, and remote web server.',
    steps: [
      {
        id: 's1',
        prompt: 'Run traceroute to inspect each intermediate hop toward 198.51.100.25 (Web Server).',
        commandToRun: 'traceroute 198.51.100.25',
        output: `Tracing route to web-prod.internal [198.51.100.25]
over a maximum of 30 hops:
  1     1 ms     1 ms     1 ms  192.168.1.1 (HQ Core Gateway)
  2     8 ms     7 ms     9 ms  10.20.0.1 (ISP Border Router)
  3     *        *        *     Request timed out (Firewall Drop on Port 80)
  4    14 ms    15 ms    13 ms  198.51.100.25 (Target Server)`,
        hint: 'Hop 3 shows request timed out because ingress HTTP/HTTPS packets were dropped by the perimeter firewall ACL.',
        question: 'What is happening at Hop 3?',
        options: [
          'Physical fiber line has snapped',
          'Firewall ACL is blocking or silently dropping ICMP / transit packets',
          'The destination server crashed',
          'The router has run out of memory'
        ],
        correctIndex: 1,
        explanation: 'Firewalls frequently suppress ICMP Time Exceeded messages, leading to asterisks (*) in traceroute hops while forwarding legitimate permitted traffic.'
      },
      {
        id: 's2',
        prompt: 'Inspect firewall rules and permit HTTPS traffic on port 443.',
        commandToRun: 'iptables -A FORWARD -p tcp --dport 443 -j ACCEPT',
        output: `Firewall ACL Rule added:
ALLOW TCP FROM ANY TO 198.51.100.25:443 [ESTABLISHED, RELATED, NEW]
Packet drops dropped from 100% to 0%. Handshake latency: 12ms.`,
        hint: 'Rule successfully applied!',
        question: 'What transport protocol and port does secure HTTPS use?',
        options: [
          'UDP port 53',
          'TCP port 443',
          'TCP port 80',
          'ICMP port 22'
        ],
        correctIndex: 1,
        explanation: 'HTTPS operates over TCP port 443 using TLS/SSL encryption for end-to-end security.'
      }
    ]
  },
  {
    id: 'database',
    title: 'Database Simulation',
    icon: '🗄️',
    domain: 'Database Management',
    difficulty: 'Hard',
    brief: 'The finance director needs a report showing the top 3 highest spending customers with their department names and total spend across all completed orders.',
    steps: [
      {
        id: 's1',
        prompt: 'Write an optimized SQL query with INNER JOIN and aggregation to retrieve customer revenue.',
        commandToRun: 'SELECT c.name, d.department_name, SUM(o.amount) AS total_spent FROM customers c JOIN departments d ON c.dept_id = d.id JOIN orders o ON c.id = o.customer_id WHERE o.status = "COMPLETED" GROUP BY c.id, c.name, d.department_name ORDER BY total_spent DESC LIMIT 3;',
        output: `Query executed successfully (3 rows returned in 1.4ms):
+---------------+-----------------+-------------+
| name          | department_name | total_spent |
+---------------+-----------------+-------------+
| Alice Chen    | Engineering     | $48,250.00  |
| Marcus Vance  | Operations      | $36,120.00  |
| Elena Rostova | Finance         | $29,800.00  |
+---------------+-----------------+-------------+`,
        hint: 'Notice the JOIN across 3 tables combined with WHERE filter and GROUP BY aggregation.',
        question: 'Which SQL clause is used to filter aggregated data like SUM(amount) > 10000?',
        options: [
          'WHERE',
          'HAVING',
          'GROUP BY',
          'FILTER BY'
        ],
        correctIndex: 1,
        explanation: 'HAVING filters results AFTER aggregation has occurred, whereas WHERE filters rows BEFORE aggregation.'
      }
    ]
  },
  {
    id: 'software-developer',
    title: 'Software Developer Simulation',
    icon: '💻',
    domain: 'Programming & Debugging',
    difficulty: 'Hard',
    brief: 'A production checkout calculation service is failing due to an off-by-one array index boundary error and missing null check. Inspect, fix, and verify.',
    steps: [
      {
        id: 's1',
        prompt: 'Inspect the stack trace and failing test case.',
        commandToRun: 'npm test cart.test.js',
        output: `FAIL src/services/cart.test.js
  ● CartService > calculates total discount correctly
    IndexOutOfBoundsException / TypeError: Cannot read properties of undefined (reading 'price')
      at calculateTotal (src/services/cart.js:14:27)
      12 |   for (let i = 0; i <= items.length; i++) {
      13 |     const item = items[i];
    > 14 |     total += item.price * (1 - (item.discount || 0));
         |                   ^`,
        hint: 'Examine line 12: `i <= items.length`. In 0-indexed arrays, the last valid index is `items.length - 1`!',
        question: 'What is the bug causing the crash?',
        options: [
          'Loop condition `i <= items.length` attempts to access out-of-bounds `items[items.length]`',
          'The `item.price` variable is misspelled',
          'JavaScript does not support `for` loops',
          'The discount formula is mathematically negative'
        ],
        correctIndex: 0,
        explanation: 'Since array indices are 0 to length - 1, using `<= items.length` evaluates the loop one extra time where `items[length]` is undefined.'
      },
      {
        id: 's2',
        prompt: 'Apply the patch changing `i <= items.length` to `i < items.length` with null check.',
        commandToRun: 'git apply fix-cart-bounds.patch && npm test',
        output: `PASS src/services/cart.test.js
  ✓ calculates total discount correctly (4ms)
  ✓ handles empty cart gracefully (1ms)
  ✓ filters out null items (2ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.412 s
All test suites passed!`,
        hint: 'Patch clean! All unit tests pass.',
        question: 'Why are defensive null checks recommended in production code?',
        options: [
          'They prevent unexpected runtime crashes when optional or malformed payload data is received',
          'They make the code execute 10x faster automatically',
          'They replace the need for unit testing',
          'They compile JavaScript into C++'
        ],
        correctIndex: 0,
        explanation: 'Defensive programming safeguards services against unpredictable external inputs, preventing unhandled exceptions and service downtime.'
      }
    ]
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer Simulation',
    icon: '☁️',
    domain: 'Cloud Computing',
    difficulty: 'Hard',
    brief: 'Design a highly available 99.99% multi-region cloud infrastructure for an enterprise web application serving 100,000 req/sec.',
    steps: [
      {
        id: 's1',
        prompt: 'Configure the global traffic router and load balancer.',
        commandToRun: 'terraform apply -target=module.global_load_balancer',
        output: `module.global_load_balancer.aws_route53_record.global_dns: Creating...
module.global_load_balancer.aws_cloudfront_distribution.edge_cdn: Creating...
module.global_load_balancer.aws_lb.app_alb: Created [DNS: alb-external.us-east-1.elb.amazonaws.com]
Apply complete! Resources: 3 added, 0 changed, 0 destroyed.
SSL Certificate: Valid (TLS 1.3)
Edge Caching: Active (240 PoPs)`,
        hint: 'Edge distribution configured! Now configure the autoscaling application pool.',
        question: 'Which component distributes incoming HTTP traffic evenly across multiple healthy EC2 / Container instances?',
        options: [
          'Application Load Balancer (ALB)',
          'Amazon S3 Glacier',
          'AWS IAM Policy',
          'NAT Gateway'
        ],
        correctIndex: 0,
        explanation: 'An Application Load Balancer distributes layer-7 web requests across autoscaling instance pools based on health check metrics.'
      },
      {
        id: 's2',
        prompt: 'Deploy Multi-AZ relational database replication with automated failover.',
        commandToRun: 'terraform apply -target=module.multi_az_aurora',
        output: `module.multi_az_aurora.aws_rds_cluster.primary: Ready [AZ: us-east-1a]
module.multi_az_aurora.aws_rds_cluster_instance.replica: Ready [AZ: us-east-1b, Sync Latency: <10ms]
Automated failover RTO: < 30 seconds
RPO: 0 data loss
System status: HIGHLY AVAILABLE 99.99% READY.`,
        hint: 'Multi-AZ replication ensures that if one data center fails, the standby replica immediately promotes without data loss.',
        question: 'What do RTO and RPO stand for in disaster recovery?',
        options: [
          'Recovery Time Objective and Recovery Point Objective',
          'Real Time Output and Real Protocol Output',
          'Read Token Object and Route Path Optimization',
          'Random Task Order and Relative Performance Objective'
        ],
        correctIndex: 0,
        explanation: 'RTO is the maximum acceptable duration of downtime; RPO is the maximum acceptable period of data loss measured in time.'
      }
    ]
  },
  {
    id: 'security',
    title: 'Security Simulation',
    icon: '🔐',
    domain: 'Information Security',
    difficulty: 'Hard',
    brief: 'A legacy login API endpoint is exposed to SQL Injection and lacks rate limiting. Exploit the vulnerability in sandbox, patch the backend, and verify defense.',
    steps: [
      {
        id: 's1',
        prompt: 'Simulate vulnerability audit on login endpoint `/api/login` with malicious payload.',
        commandToRun: 'curl -X POST /api/login -d "user=admin\' OR \'1\'=\'1&pass=x"',
        output: `HTTP/1.1 200 OK
Content-Type: application/json
{
  "status": "VULNERABILITY_CONFIRMED",
  "auth": true,
  "user": "admin",
  "role": "SUPERUSER_ACCESS_GRANTED",
  "raw_sql_executed": "SELECT * FROM users WHERE username = 'admin' OR '1'='1' AND password = 'x'"
}
WARNING: SQL Injection flaw detected! Unsanitized string interpolation in SQL query.`,
        hint: 'The raw query was vulnerable because user input was concatenated directly into the query string.',
        question: 'What is the primary industry standard remedy against SQL Injection?',
        options: [
          'Parameterized Prepared Statements',
          'Hashing the database table names',
          'Hiding the login screen URL',
          'Disabling all database queries'
        ],
        correctIndex: 0,
        explanation: 'Prepared statements with parameterized queries treat user input strictly as data, never as executable SQL code.'
      },
      {
        id: 's2',
        prompt: 'Deploy parameterized query patch with bcrypt password hashing and rate limiting.',
        commandToRun: 'git apply secure-auth.patch && npm test test/security.test.js',
        output: `SEC-AUDIT: Testing payload: admin' OR '1'='1 --
Result: HTTP 401 Unauthorized (Input escaped safely as literal string parameter)
SEC-AUDIT: Testing brute force (50 requests/sec)
Result: HTTP 429 Too Many Requests (Rate limit enforced: max 5 attempts/min)
PASS test/security.test.js (100% defense score)`,
        hint: 'Vulnerability eliminated! The endpoint is fortified against injection and brute-force attacks.',
        question: 'Which component of the CIA triad does encryption primarily protect?',
        options: [
          'Confidentiality',
          'Integrity',
          'Availability',
          'Accounting'
        ],
        correctIndex: 0,
        explanation: 'Confidentiality ensures that sensitive data is concealed from unauthorized individuals through encryption and access controls.'
      }
    ]
  },
  {
    id: 'devops',
    title: 'DevOps CI/CD Simulation',
    icon: '🚀',
    domain: 'DevOps & Automation',
    difficulty: 'Medium',
    brief: 'The main branch deployment pipeline failed at stage 3 (Docker Build) due to an incorrect base image tag and failing linting rules. Debug and deploy.',
    steps: [
      {
        id: 's1',
        prompt: 'Inspect CI/CD GitHub Actions workflow logs.',
        commandToRun: 'gh run view --log-failed',
        output: `[Stage 1: Lint] -> SUCCESS (12s)
[Stage 2: Unit Tests] -> SUCCESS (28s)
[Stage 3: Docker Build] -> FAILED (exit code 1)
Error response from daemon: manifest for node:29-alpine not found: manifest unknown
Dockerfile:1 | FROM node:29-alpine
Error: Build process failed at step 1.`,
        hint: '`node:29-alpine` does not exist in Docker Hub because Node.js 29 has not been released. The LTS version is `node:22-alpine` or `node:20-alpine`.',
        question: 'What caused the Docker build stage to abort?',
        options: [
          'Non-existent base container tag specified in Dockerfile',
          'Insufficient disk space on the GitHub runner',
          'Missing Git commit author name',
          'JavaScript syntax error'
        ],
        correctIndex: 0,
        explanation: 'Specifying an invalid or non-existent base image causes docker build to fail during the image fetch step.'
      },
      {
        id: 's2',
        prompt: 'Update Dockerfile to `node:22-alpine` and trigger pipeline rerun.',
        commandToRun: 'sed -i "s/29-alpine/22-alpine/" Dockerfile && git push && gh run watch',
        output: `[Stage 1: Lint] -> PASSED (11s)
[Stage 2: Unit Tests] -> PASSED (26s)
[Stage 3: Docker Build] -> PASSED (18s) [Image: ghcr.io/multiverse/api:v1.4.2]
[Stage 4: Staging Deploy] -> PASSED (34s) [Health Check: 200 OK]
[Stage 5: Canary 10%] -> PASSED (No anomalies)
[Stage 6: Production 100%] -> DEPLOYED TO CLUSTER! 🚀`,
        hint: 'Zero downtime deployment achieved using canary progression!',
        question: 'What is a Canary Deployment strategy in DevOps?',
        options: [
          'Rolling out updates to a small subset of users first before full production rollout',
          'Shutting down all servers simultaneously and restarting them',
          'Writing tests after deploying to production',
          'Testing code exclusively on the developer’s local laptop'
        ],
        correctIndex: 0,
        explanation: 'Canary releases route a tiny percentage of production traffic to the new version to detect errors with minimal blast radius before expanding to 100%.'
      }
    ]
  }
];
