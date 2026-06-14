# Unified Campus Intelligence Dashboard

## Overview

Universities generate information across multiple disconnected systems such as library portals, event portals, cafeteria websites, academic handbooks, and student services. Students often spend significant time searching through these systems to find simple information.

This project solves that problem by providing a single AI-powered dashboard that can retrieve information from multiple campus services and answer questions in natural language.

---

## Problem Statement

Campus information is fragmented across different platforms:

- Library systems contain book availability information.
- Event portals contain upcoming campus activities.
- Cafeteria systems contain daily menu information.
- Academic portals and handbooks contain attendance policies, credits, and regulations.

Students must manually navigate each system separately.

The goal of this project is to create a unified campus intelligence platform that allows students to access all this information from a single interface.

---

## Solution

The project uses a multi-server architecture inspired by the Model Context Protocol (MCP).

Instead of storing all information in one application, each campus service runs as an independent server.

An AI assistant acts as a router that:

1. Understands the student's question.
2. Determines which service contains the required information.
3. Fetches data from one or more servers.
4. Combines the results into a single response.

Example:

### User Query

> What books are available and what is today's cafeteria menu?

### AI Workflow

1. Detects that the query requires:
   - Library information
   - Cafeteria information

2. Calls:
   - Library MCP Server
   - Cafeteria MCP Server

3. Merges the results into one response:

```
📚 AVAILABLE BOOKS

• Introduction to Algorithms
• Computer Networks

🍽 TODAY'S MENU

• Veg Biryani
```

---

## System Architecture

```text
                    ┌─────────────────┐
                    │     Student     │
                    └────────┬────────┘
                             │
                             ▼
                 ┌─────────────────────┐
                 │ Next.js Frontend UI │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │  Gemini AI Router   │
                 └──────────┬──────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼

 ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
 │ Library MCP │    │ Events MCP  │    │ Cafeteria   │
 └─────────────┘    └─────────────┘    └─────────────┘

                            │
                            ▼

                    ┌─────────────┐
                    │ Academics   │
                    │ MCP Server  │
                    └─────────────┘
```

---

## Features

### Library MCP

- View available books
- Check book availability

### Events MCP

- View upcoming campus events
- Access event dates and details

### Cafeteria MCP

- View cafeteria menu
- Automatically identify today's menu

### Academics MCP

- Attendance policies
- Credit requirements
- Academic regulations

### AI Assistant

- Natural language queries
- Multi-server routing
- Cross-service queries
- Unified responses

---

## Example Queries

### Library

> What books are available?

### Cafeteria

> What is today's menu?

### Events

> What events are happening this week?

### Academics

> What is the attendance requirement?

### Cross-Service Query

> What books are available and what is today's menu?

---

## Tech Stack

### Frontend

- Next.js
- React
- Tailwind CSS

### Backend

- Node.js
- Express.js

### AI Layer

- Google Gemini API

### Data Storage

- JSON-based mock datasets

---

## Project Structure

```text
campus-intelligence/

├── app/
│   ├── academics/
│   ├── cafeteria/
│   ├── chat/
│   ├── events/
│   ├── library/
│   └── api/
│
├── components/
│
├── data/
│   ├── academics.json
│   ├── cafeteria.json
│   ├── events.json
│   └── library.json
│
├── servers/
│   ├── academic-server/
│   ├── cafeteria-server/
│   ├── event-server/
│   └── library-server/
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd campus-intelligence
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

Create a file named:

```text
.env
```

Add:

```env
GEMINI_API_KEY=your_api_key_here
```

---

## Running the MCP Servers

### Library Server

```bash
cd servers/library-server
node server.js
```

### Events Server

```bash
cd servers/event-server
node servers.js
```

### Cafeteria Server

```bash
cd servers/cafeteria-server
node servers.js
```

### Academic Server

```bash
cd servers/academic-server
node servers.js
```

---

## Run Frontend

From the project root:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Future Improvements

- Real library database integration
- PDF handbook search
- Student timetable integration
- Authentication system
- Real-time event updates
- Hostel and transport services
- Faculty directory search
- Campus map integration

---

## Authors

Developed as a Unified Campus Intelligence Dashboard using MCP-inspired architecture and AI-powered routing.
