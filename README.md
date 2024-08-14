# Bi-Weekly Buddy Meetings

This project allows you to pair team members for bi-weekly buddy meetings, ensuring that each person is matched with a different person every time. The pairs are randomized, and once a person is paired, they cannot be paired with someone else until the two-week time period is over.

## Features

- Persistent pairing storage using SQLite.
- Backend logic to ensure that pairs are unique and respected over the two-week period.
- Easy management of team members (adding/removing names).
- Simple frontend with scheduling link integration.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/bi-weekly-buddy-meetings.git
    cd bi-weekly-buddy-meetings
    ```

2. Create a virtual environment and activate it:
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install dependencies
