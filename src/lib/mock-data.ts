import type { Project, User } from "@/types";

export const currentUser: User = {
  id: "user-1",
  name: "Alex Thompson",
  email: "alex@university.edu",
};

export const mockProjects: Project[] = [
  {
    id: "proj-1",
    name: "Databases Midterm",
    description: "Study materials for CS 340 Databases",
    currentUserRole: "owner",
    members: [
      { user: currentUser, role: "owner", joinedAt: "2026-01-15T10:00:00Z" },
      { user: { id: "user-2", name: "Jordan Lee", email: "jordan@university.edu" }, role: "editor", joinedAt: "2026-01-16T14:00:00Z" },
      { user: { id: "user-3", name: "Sam Rivera", email: "sam@university.edu" }, role: "viewer", joinedAt: "2026-01-20T09:00:00Z" },
    ],
    files: [
      { id: "file-1", name: "Chapter 5 - SQL Queries.pdf", type: "pdf", size: 2400000, uploadedAt: "2026-01-20T10:00:00Z", uploadedBy: "user-1", status: "completed", progress: 100 },
      { id: "file-2", name: "Normalization Notes.txt", type: "txt", size: 45000, uploadedAt: "2026-01-21T14:30:00Z", uploadedBy: "user-2", status: "completed", progress: 100 },
      { id: "file-3", name: "ER Diagrams Lecture.pptx", type: "pptx", size: 5200000, uploadedAt: "2026-01-22T09:15:00Z", uploadedBy: "user-1", status: "extracting", progress: 45 },
    ],
    concepts: [
      { id: "c-1", term: "Normalization", explanation: "The process of organizing data to reduce redundancy and improve data integrity through normal forms (1NF, 2NF, 3NF, BCNF).", tags: ["database design", "schema"], sourceFile: "file-2", sourcePage: 1 },
      { id: "c-2", term: "SQL JOIN", explanation: "An operation that combines rows from two or more tables based on a related column. Types include INNER, LEFT, RIGHT, and FULL OUTER JOIN.", tags: ["SQL", "queries"], sourceFile: "file-1", sourcePage: 12 },
      { id: "c-3", term: "Entity-Relationship Model", explanation: "A conceptual data model that describes data entities, their attributes, and the relationships between them using ER diagrams.", tags: ["data modeling", "ER diagrams"], sourceFile: "file-3", sourcePage: 3 },
      { id: "c-4", term: "Primary Key", explanation: "A column or set of columns that uniquely identifies each row in a table. Must be unique and not null.", tags: ["schema", "constraints"], sourceFile: "file-1", sourcePage: 5 },
      { id: "c-5", term: "Foreign Key", explanation: "A column that creates a link between two tables by referencing the primary key of another table.", tags: ["schema", "relationships"], sourceFile: "file-1", sourcePage: 7 },
    ],
    fileSummaries: [
      { fileId: "file-1", fileName: "Chapter 5 - SQL Queries.pdf", summary: "Comprehensive guide covering SQL query syntax including SELECT, INSERT, UPDATE, DELETE operations. Covers JOINs, subqueries, aggregation functions, and GROUP BY clauses with practical examples.", sections: [{ heading: "Basic Queries", content: "SELECT statements with WHERE clauses, ORDER BY, and LIMIT. Covers comparison operators and pattern matching with LIKE." }, { heading: "Joins & Subqueries", content: "Inner joins, outer joins, cross joins, and self-joins. Correlated and non-correlated subqueries with EXISTS and IN operators." }] },
      { fileId: "file-2", fileName: "Normalization Notes.txt", summary: "Detailed notes on database normalization from 1NF through BCNF. Includes functional dependency analysis and decomposition techniques.", sections: [{ heading: "First Normal Form", content: "Eliminate repeating groups, ensure atomic values in each column, and define a primary key." }, { heading: "Higher Normal Forms", content: "2NF eliminates partial dependencies, 3NF eliminates transitive dependencies, BCNF handles remaining anomalies." }] },
    ],
    chatMessages: [
      { id: "msg-1", role: "user", content: "Summarize the key differences between 2NF and 3NF", timestamp: "2026-01-22T15:00:00Z" },
      { id: "msg-2", role: "assistant", content: "**2NF vs 3NF:**\n\n**Second Normal Form (2NF)** eliminates *partial dependencies* — attributes that depend on only part of a composite primary key. A table must already be in 1NF.\n\n**Third Normal Form (3NF)** eliminates *transitive dependencies* — non-key attributes that depend on other non-key attributes rather than directly on the primary key.\n\n**Example:** If a table has columns (StudentID, CourseID, CourseName), CourseName depends only on CourseID (partial dependency → violates 2NF). If a table has (StudentID, DeptID, DeptName), DeptName depends on DeptID which depends on StudentID (transitive → violates 3NF).", citations: [{ fileName: "Normalization Notes.txt", page: 1 }], timestamp: "2026-01-22T15:00:05Z" },
    ],
    practiceQuestions: [
      { id: "q-1", type: "recall", question: "What are the four types of SQL JOINs?", answer: "INNER JOIN, LEFT (OUTER) JOIN, RIGHT (OUTER) JOIN, and FULL OUTER JOIN.", explanation: "Each JOIN type determines which rows are included when combining tables. INNER returns only matching rows, LEFT/RIGHT return all from one side plus matches, FULL returns all rows from both tables.", sourceFile: "file-1", sourcePage: 12, version: 1 },
      { id: "q-2", type: "understanding", question: "Why might denormalization be preferred over full normalization in some cases?", answer: "Denormalization can improve read performance by reducing the number of JOINs needed, at the cost of data redundancy and more complex updates.", explanation: "While normalization reduces redundancy, highly normalized schemas require many JOINs for queries. In read-heavy applications (analytics, reporting), controlled denormalization trades storage space for query performance.", sourceFile: "file-2", sourcePage: 1, version: 1 },
      { id: "q-3", type: "application", question: "Given a table Orders(OrderID, CustomerID, CustomerName, ProductID, ProductName, Quantity), identify the normalization violations and decompose into 3NF.", answer: "CustomerName depends on CustomerID (partial if composite PK, transitive if OrderID is PK). ProductName depends on ProductID similarly. Decompose into: Orders(OrderID, CustomerID, ProductID, Quantity), Customers(CustomerID, CustomerName), Products(ProductID, ProductName).", explanation: "This demonstrates identifying functional dependencies and performing lossless decomposition. Each resulting table has all non-key attributes fully dependent on the primary key with no transitive dependencies.", sourceFile: "file-2", sourcePage: 1, version: 1 },
    ],
    projectSummary: "This project covers fundamental database concepts including SQL queries, normalization theory (1NF through BCNF), and entity-relationship modeling. Key topics include JOIN operations, functional dependencies, and schema design principles.",
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-02-08T16:30:00Z",
  },
  {
    id: "proj-2",
    name: "Organic Chemistry Final",
    description: "OChem II study group materials",
    currentUserRole: "editor",
    members: [
      { user: { id: "user-4", name: "Dr. Chen", email: "chen@university.edu" }, role: "owner", joinedAt: "2026-01-10T08:00:00Z" },
      { user: currentUser, role: "editor", joinedAt: "2026-01-12T11:00:00Z" },
    ],
    files: [
      { id: "file-4", name: "Reaction Mechanisms.pdf", type: "pdf", size: 3100000, uploadedAt: "2026-01-14T10:00:00Z", uploadedBy: "user-4", status: "completed", progress: 100 },
    ],
    concepts: [
      { id: "c-6", term: "SN2 Reaction", explanation: "A bimolecular nucleophilic substitution where the nucleophile attacks the substrate simultaneously as the leaving group departs, resulting in inversion of stereochemistry.", tags: ["mechanisms", "substitution"], sourceFile: "file-4", sourcePage: 5 },
    ],
    fileSummaries: [],
    chatMessages: [],
    practiceQuestions: [],
    projectSummary: "Organic Chemistry II covering reaction mechanisms, stereochemistry, and synthesis strategies.",
    createdAt: "2026-01-10T08:00:00Z",
    updatedAt: "2026-02-05T12:00:00Z",
  },
  {
    id: "proj-3",
    name: "World History Essay",
    description: "Research for term paper",
    currentUserRole: "viewer",
    members: [
      { user: { id: "user-5", name: "Maria Santos", email: "maria@university.edu" }, role: "owner", joinedAt: "2026-01-08T10:00:00Z" },
      { user: currentUser, role: "viewer", joinedAt: "2026-01-25T09:00:00Z" },
    ],
    files: [],
    concepts: [],
    fileSummaries: [],
    chatMessages: [],
    practiceQuestions: [],
    projectSummary: "",
    createdAt: "2026-01-08T10:00:00Z",
    updatedAt: "2026-01-30T14:00:00Z",
  },
];

export const mockAIResponses: Record<string, string> = {
  "summarize this file": "Here's a summary of the selected file:\n\nThe document covers the fundamental concepts of the topic, organized into key sections. The main themes include foundational definitions, practical applications, and common pitfalls to avoid.\n\n**Key Takeaways:**\n1. Core terminology and definitions are established early\n2. Practical examples demonstrate real-world applications\n3. Common misconceptions are addressed with corrections\n4. Review questions test understanding at multiple levels",
  "compare topic a vs b": "**Comparison Analysis:**\n\n| Aspect | Topic A | Topic B |\n|--------|---------|--------|\n| Definition | Foundational concept | Advanced extension |\n| Complexity | Moderate | High |\n| Applications | Broad | Specialized |\n\nBoth topics share common theoretical foundations but diverge in their practical applications. Topic A serves as a prerequisite for understanding Topic B.",
  "generate questions": "Here are some practice questions generated from your materials:\n\n1. **Recall:** Define the key terms introduced in Chapter 1\n2. **Understanding:** Explain why the described process works the way it does\n3. **Application:** Given a new scenario, apply the learned principles to solve the problem",
};