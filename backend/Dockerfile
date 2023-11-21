FROM golang:1.21.4-alpine3.18
RUN mkdir /logger
ADD . /logger
WORKDIR /logger
RUN go build -o main .
CMD ["/logger/main"]
