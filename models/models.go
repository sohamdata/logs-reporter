package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Log struct {
	ID         primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Level      string             `bson:"level" json:"level"`
	Message    string             `bson:"message" json:"message"`
	ResourceID string             `bson:"resourceId" json:"resourceId"`
	Timestamp  string             `bson:"timestamp" json:"timestamp"`
	TraceID    string             `bson:"traceId" json:"traceId"`
	SpanID     string             `bson:"spanId" json:"spanId"`
	Commit     string             `bson:"commit" json:"commit"`
	Metadata   Metadata           `bson:"metadata" json:"metadata"`
}

type Metadata struct {
	ParentResourceID string `bson:"parentResourceId" json:"parentResourceId"`
}
