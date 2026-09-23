export const PROJECTS_DATA = [
  {
    id: 'c-student-system',
    title: 'Student Management System',
    language: 'C',
    level: 5,
    domain: 'Programming',
    icon: '💻',
    difficulty: 'Intermediate',
    description: 'Build a high-performance console application in C that uses structs, file pointers, binary files, and quicksort to manage student records, compute GPAs, and persist data across executions.',
    milestones: [
      'Define `struct Student` with roll number, name, marks array, and GPA',
      'Implement `add_student()` and write records into `students.dat` binary file',
      'Implement binary search by roll number for O(log N) lookup',
      'Sort records in descending order of GPA using quicksort and print tabular report'
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    int roll;
    char name[50];
    float marks[5];
    float gpa;
} Student;

void calculateGPA(Student* s) {
    float sum = 0;
    for (int i = 0; i < 5; i++) sum += s->marks[i];
    s->gpa = (sum / 5.0) / 10.0 * 4.0; // 4.0 scale
}

int main() {
    Student s1 = {101, "Alice Smith", {92, 88, 95, 90, 89}, 0};
    calculateGPA(&s1);
    printf("Student: %s | Roll: %d | GPA: %.2f\\n", s1.name, s1.roll, s1.gpa);
    return 0;
}`,
    architectureSummary: 'Demonstrates manual memory layout, pointer arithmetic, binary file I/O operations, and dynamic struct manipulation.'
  },
  {
    id: 'dbms-library',
    title: 'Library Management Database',
    language: 'SQL',
    level: 6,
    domain: 'Database',
    icon: '🗄️',
    difficulty: 'Intermediate',
    description: 'Design a normalized 3NF relational database schema for a campus library. Implement foreign key constraints, triggers for overdue fines, and transactions for checkout safety.',
    milestones: [
      'Create 3NF tables: `Books`, `Members`, `Loans`, `Fines`',
      'Add composite indexes on ISBN and Member ID for fast queries',
      'Implement a stored procedure for `CheckoutBook()` with concurrency lock',
      'Write an analytical query calculating top 5 most borrowed genres'
    ],
    starterCode: `CREATE TABLE Books (
    book_id INT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    author VARCHAR(100),
    isbn VARCHAR(20) UNIQUE,
    available_copies INT DEFAULT 1
);

CREATE TABLE Members (
    member_id INT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    membership_tier VARCHAR(20) DEFAULT 'STANDARD'
);

CREATE TABLE Loans (
    loan_id INT PRIMARY KEY,
    book_id INT REFERENCES Books(book_id),
    member_id INT REFERENCES Members(member_id),
    borrow_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE
);`,
    architectureSummary: 'Enforces Referential Integrity, ACID transactional guarantees, 3NF normalization, and query optimization.'
  },
  {
    id: 'web-portfolio',
    title: 'Modern Developer Portfolio',
    language: 'Web (HTML/CSS/JS)',
    level: 7,
    domain: 'Web Development',
    icon: '🌐',
    difficulty: 'Beginner',
    description: 'Create a responsive, mobile-first developer portfolio website featuring dark/light mode toggle, dynamic GitHub repository fetch, smooth scrolling, and accessible semantic markup.',
    milestones: [
      'Structure semantic HTML5 markup with accessible ARIA landmarks',
      'Apply CSS Grid and Flexbox for adaptive responsive layouts',
      'Implement theme switcher using CSS custom variables and localStorage',
      'Fetch live public repositories from GitHub REST API with loading states'
    ],
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Developer Portfolio</title>
  <style>
    :root { --bg: #090a10; --text: #f3f4f6; --accent: #f59e0b; }
    body { background: var(--bg); color: var(--text); font-family: sans-serif; padding: 20px; }
    .card { border: 1px solid #2e303a; border-radius: 12px; padding: 16px; margin-bottom: 12px; }
  </style>
</head>
<body>
  <h1>Hi, I'm a Multiverse Engineer 🚀</h1>
  <div class="card">
    <h3>Featured Project: Cloud Architecture Blueprint</h3>
    <p>Resilient multi-AZ cloud architecture on AWS/GCP.</p>
  </div>
</body>
</html>`,
    architectureSummary: 'Demonstrates modern DOM manipulation, asynchronous fetch APIs, CSS variables, and responsive design patterns.'
  },
  {
    id: 'js-dashboard',
    title: 'Interactive Crypto & Market Dashboard',
    language: 'JavaScript',
    level: 7,
    domain: 'Frontend Engineering',
    icon: '📊',
    difficulty: 'Intermediate',
    description: 'Build an interactive real-time asset dashboard using vanilla JavaScript or Canvas. Includes sparkline charts, currency conversion, watchlist management, and price alert notifications.',
    milestones: [
      'Render dynamic SVG / Canvas price trend sparklines',
      'Calculate 24h price change percentage and color-code indicators',
      'Persist custom watchlists in browser localStorage',
      'Implement real-time search filter with debouncing'
    ],
    starterCode: `const assets = [
  { symbol: 'BTC', name: 'Bitcoin', price: 92450.00, change24h: 3.4 },
  { symbol: 'ETH', name: 'Ethereum', price: 3480.50, change24h: -1.2 },
  { symbol: 'SOL', name: 'Solana', price: 215.80, change24h: 6.8 }
];

function renderDashboard(items) {
  return items.map(a => 
    \`\${a.symbol} (\${a.name}): $\${a.price.toLocaleString()} [\${a.change24h > 0 ? '+' : ''}\${a.change24h}%]\`
  ).join('\\n');
}

console.log(renderDashboard(assets));`,
    architectureSummary: 'High-frequency UI updates, event-driven architecture, state management, and SVG data visualization.'
  },
  {
    id: 'sql-analytics',
    title: 'Business Analytics E-Commerce Database',
    language: 'SQL',
    level: 6,
    domain: 'Database & Analytics',
    icon: '📈',
    difficulty: 'Advanced',
    description: 'Write complex analytical queries, Window Functions (ROW_NUMBER, RANK, LAG/LEAD), and CTEs (Common Table Expressions) to compute monthly recurring revenue, churn rate, and customer lifetime value (LTV).',
    milestones: [
      'Calculate Monthly Active Users (MAU) and month-over-month growth',
      'Use `LAG()` window function to calculate order delta between consecutive purchases',
      'Implement RFM (Recency, Frequency, Monetary) segmentation query',
      'Identify top 10% highest-value customers using NTILE(10)'
    ],
    starterCode: `WITH MonthlyRevenue AS (
    SELECT 
        DATE_TRUNC('month', order_date) AS order_month,
        SUM(total_amount) AS revenue,
        COUNT(DISTINCT customer_id) AS active_customers
    FROM orders
    WHERE status = 'DELIVERED'
    GROUP BY DATE_TRUNC('month', order_date)
)
SELECT 
    order_month,
    revenue,
    active_customers,
    LAG(revenue, 1) OVER (ORDER BY order_month) AS prev_month_revenue,
    ROUND(((revenue - LAG(revenue, 1) OVER (ORDER BY order_month)) / LAG(revenue, 1) OVER (ORDER BY order_month)) * 100, 2) AS mom_growth_pct
FROM MonthlyRevenue;`,
    architectureSummary: 'Deep analytical SQL patterns, CTEs, Windowing Functions, and cohort analysis.'
  },
  {
    id: 'net-enterprise',
    title: 'Small Enterprise Network Design',
    language: 'Networking',
    level: 15,
    domain: 'Networking',
    icon: '🌐',
    difficulty: 'Intermediate',
    description: 'Design a resilient network layout for a 200-employee company across 3 floors. Allocate VLSM subnets, design VLANs (Management, Engineering, Guest, VoIP), and configure default gateway redundancy (HSRP/VRRP).',
    milestones: [
      'Calculate CIDR subnets using VLSM for 4 distinct departments',
      'Configure IEEE 802.1Q trunking between Core and Access switches',
      'Set up DHCP helper addresses and ACL security boundaries',
      'Define DMZ architecture for public-facing web services'
    ],
    starterCode: `Topology Blueprint:
ISP Router -> Perimeter Firewall (DMZ) -> Core L3 Switch (VRRP) ->
Floor 1 Access Switch (VLAN 10: Corp, VLAN 20: Guest)
Floor 2 Access Switch (VLAN 30: Engineering, VLAN 40: Servers)

Subnet Allocation: 10.0.0.0/16
VLAN 10 Corp: 10.0.1.0/24 (Usable: 254 hosts)
VLAN 20 Guest: 10.0.2.0/24 (Isolated via ACL)
VLAN 30 Eng: 10.0.3.0/24
VLAN 40 Servers: 10.0.4.0/24`,
    architectureSummary: 'Enterprise routing & switching, CIDR calculation, broadcast domain isolation, and firewall perimeter defense.'
  },
  {
    id: 'cloud-blueprint',
    title: 'Cloud Architecture Blueprint',
    language: 'Cloud & Terraform',
    level: 17,
    domain: 'Cloud Infrastructure',
    icon: '☁️',
    difficulty: 'Advanced',
    description: 'Architect and diagram an enterprise-grade cloud environment on AWS/GCP with Auto-Scaling Groups, Application Load Balancers, Multi-AZ RDS, CloudFront CDN, and S3 Storage.',
    milestones: [
      'Design public and private subnets across 2 Availability Zones',
      'Configure Security Groups implementing the Principle of Least Privilege',
      'Define Auto-Scaling policy triggered by CPU utilization > 70%',
      'Specify Disaster Recovery plan with RTO < 15 min and RPO < 1 min'
    ],
    starterCode: `Cloud Infrastructure Blueprint (Terraform):
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  cidr   = "10.100.0.0/16"
  azs    = ["us-east-1a", "us-east-1b"]
  public_subnets  = ["10.100.1.0/24", "10.100.2.0/24"]
  private_subnets = ["10.100.11.0/24", "10.100.12.0/24"]
  enable_nat_gateway = true
  single_nat_gateway = false
}`,
    architectureSummary: 'Multi-AZ fault tolerance, zero single-point-of-failure design, cloud cost optimization, and infrastructure as code.'
  },
  {
    id: 'ai-mini-app',
    title: 'AI Sentiment & Intent Classifier',
    language: 'Python',
    level: 20,
    domain: 'Artificial Intelligence',
    icon: '🤖',
    difficulty: 'Intermediate',
    description: 'Build a lightweight text classification pipeline that tokenizes customer feedback, calculates TF-IDF feature vectors, and predicts customer sentiment (Positive, Neutral, Negative) with confidence probabilities.',
    milestones: [
      'Preprocess text: lowercasing, punctuation removal, stop-word filtering',
      'Compute n-gram frequency distributions and term weights',
      'Train a Multinomial Naive Bayes classifier on training samples',
      'Evaluate model using Accuracy, Precision, Recall, and Confusion Matrix'
    ],
    starterCode: `import math

def simple_sentiment_predict(text):
    positive_words = {'love', 'great', 'awesome', 'excellent', 'fast', 'best', 'superb'}
    negative_words = {'terrible', 'slow', 'bad', 'broken', 'horrible', 'worst', 'bug'}
    
    tokens = text.lower().replace('.', '').replace('!', '').split()
    pos_score = sum(1 for w in tokens if w in positive_words)
    neg_score = sum(1 for w in tokens if w in negative_words)
    
    if pos_score > neg_score:
        return 'POSITIVE', round(pos_score / (pos_score + neg_score + 1e-5), 2)
    elif neg_score > pos_score:
        return 'NEGATIVE', round(neg_score / (pos_score + neg_score + 1e-5), 2)
    return 'NEUTRAL', 0.5

print(simple_sentiment_predict("This app has superb speed and awesome UI!"))`,
    architectureSummary: 'Text feature extraction, classification heuristics, supervised learning concepts, and probabilistic inference.'
  },
  {
    id: 'iot-smart-home',
    title: 'Smart Home IoT Automation System',
    language: 'IoT & Embedded',
    level: 23,
    domain: 'Internet of Things',
    icon: '📡',
    difficulty: 'Intermediate',
    description: 'Design an event-driven IoT sensor monitoring network using MQTT telemetry protocols. Collect temperature, humidity, and motion sensor data, triggering automated HVAC and security alerts.',
    milestones: [
      'Define JSON payload structure for sensor telemetry data',
      'Implement MQTT pub/sub topic hierarchy (`home/floor1/living/temp`)',
      'Process edge triggers: notify user if temperature exceeds 35°C',
      'Handle offline device reconnects and QoS level 1 packet delivery'
    ],
    starterCode: `const mqttPayload = {
  deviceId: "sensor-node-04b",
  timestamp: Date.now(),
  metrics: {
    temperature: 24.8,
    humidity: 45.2,
    motionDetected: false
  },
  batteryLevel: 94
};

function processTelemetry(data) {
  if (data.metrics.temperature > 30.0) {
    return { alert: true, action: "ENGAGE_COOLING_SYSTEM", target: "HVAC_ZONE_1" };
  }
  return { alert: false, action: "STANDBY" };
}

console.log(processTelemetry(mqttPayload));`,
    architectureSummary: 'Edge sensor networks, lightweight publish-subscribe protocols, real-time telemetry streaming, and automated event triggers.'
  },
  {
    id: 'blockchain-demo',
    title: 'Simple Blockchain & Proof of Work Demo',
    language: 'JavaScript / Python',
    level: 22,
    domain: 'Blockchain',
    icon: '⛓️',
    difficulty: 'Intermediate',
    description: 'Construct a complete working blockchain data structure from scratch. Implement cryptographic block hashing, genesis block initialization, Proof of Work mining difficulty, and chain integrity validation.',
    milestones: [
      'Create Block class with `index`, `timestamp`, `data`, `previousHash`, `nonce`, and `hash`',
      'Implement SHA-256 block hash computation',
      'Implement `mineBlock(difficulty)` finding hash with leading zeroes',
      'Implement `isChainValid()` verifying cryptographic continuity'
    ],
    starterCode: `class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    // In real app, standard SHA-256
    let str = this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padStart(8, '0');
  }

  mineBlock(difficulty) {
    const target = '0'.repeat(difficulty);
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(\`Block mined: \${this.hash} (Nonce: \${this.nonce})\`);
  }
}

const genesis = new Block(0, Date.now(), { message: "Genesis Block" }, "0");
genesis.mineBlock(2);`,
    architectureSummary: 'Cryptographic hash linking, immutable ledger concepts, Proof-of-Work consensus algorithm, and tamper detection.'
  }
];
