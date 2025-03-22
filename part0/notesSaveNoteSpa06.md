```mermaid
sequenceDiagram
    Note over Browser: Add new note to notes array on submit
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Server->>Browser: HTTP 201 Reply with message "note created"
    Note over Browser: Redraw all notes

```
