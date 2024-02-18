package models

type Log struct {
	ID         int64
	Level      string
	Message    string
	ResourceID string
	Timestamp  string
	TraceID    string
	SpanID     string
	Commit     string
	Metadata   Metadata
}

type Metadata struct {
	ParentResourceID string
}
