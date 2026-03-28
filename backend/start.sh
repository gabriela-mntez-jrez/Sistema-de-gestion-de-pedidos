#!/bin/bash
# Build del backend
mvn clean package -DskipTests

# Run the app
java -jar target/orders-api-0.0.1-SNAPSHOT.jar