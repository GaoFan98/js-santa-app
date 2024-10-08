# JS Santa App
## Features
1. Validates child ID and ensures the child is under 10 years old.
2. Processes messages and queues them for sending to Santa.
3. Sends aggregated emails every 15 seconds with all pending messages.
4. Built with a microservice architecture using RabbitMQ for messaging and Redis for caching.

## Architecture
### Stack
1. Node.js, Express js for backend
2. React, TS frontend
3. RabbitMQ for messaging queue
4. Nodemailer for sending emails
5. Jest for testing
6. Docker for app containerization 

### Diagrams
 Please refer to diagrams folder in project root
 ## Layers 
![layers](https://raw.githubusercontent.com/GaoFan98/js-santa-app/master/diagrams/layers.png)
## Services
![services](https://raw.githubusercontent.com/GaoFan98/js-santa-app/master/diagrams/services.png)

### Architectural Patterns Used
### NOTE! This application can be implemented without any complications using pattern below. All patterns were implemented for knowlege show case. It can just be 1 end point and frontend :D 
1. <b>Microservices Architecture</b> <br>
    Microservices is an architectural style that organizes an application as a collection of small, autonomous services. Each service is independently deployable and is responsible for a specific business function within the system. Services communicate with each other over a network.
    Application: The project is divided into distinct services (client, server, queue), each handling a specific aspect of the application. This modularity allows independent development, deployment, and scaling of each service.
2. <b>Message Queue (MQ) Pattern</b> <br>
    Message Queue pattern uses a queue to facilitate communication between different components of a system. Messages are placed in the queue by one component and processed asynchronously by another. This decoupling allows for scalability and fault tolerance.
    Application: RabbitMQ is used to implement a message queue system where the server service sends messages to a queue. These messages are then processed asynchronously by a worker service, handling tasks such as sending emails.
3. <b>Idempotency Pattern</b> <br>
    Idempotency pattern ensures that an operation can be executed multiple times without changing the result beyond the initial application. This pattern is crucial in systems where operations may be retried due to failures or other issues.
    Application: An idempotencyService is implemented to ensure that operations, such as sending messages, are processed exactly once, preventing duplicate processing in cases of repeated requests.
4. <b>Retry Pattern</b> <br>
    Retry pattern is used to automatically retry operations a certain number of times before treating them as failed. This is particularly useful for handling transient failures in distributed systems, such as temporary network issues.
    Application: A retryHandler is employed to retry operations like email sending multiple times before giving up, ensuring that temporary failures do not result in lost operations.
5. <b>Health Check Pattern</b> <br>
    Health Check pattern is employed to monitor the health of services in a system. It ensures that only healthy services are available for handling requests and that any issues are detected and addressed promptly.
    Application: Health checks are configured in the Docker Compose setup for RabbitMQ, ensuring that the service is operational before dependent services start.
6. <b>CQRS (Command Query Responsibility Segregation)</b> <br>
    CQRS pattern separates the responsibilities of command and query operations. Command operations (write) modify data, while query operations (read) retrieve data, allowing for optimized read and write operations.
    Application: The project uses CQRS by separating the validation and message processing logic into commands (e.g., validateChildCommand, sendMessageCommand) and queries (e.g., getMessageEventsQuery), allowing for clear separation of responsibilities and optimized performance.
7. <b>Event Sourcing</b> <br>
    Event Sourcing ensures that all changes to the application state are stored as a sequence of events. This allows the system to rebuild the current state by replaying these events, providing a complete audit trail and enabling complex scenarios like temporal queries.
    Application: The project implements Event Sourcing by recording events, such as child validation attempts, into a MongoDB-based event store. This allows the system to reconstruct the state of the application by replaying these events, providing a reliable and traceable record of all actions.
8. <b>Rate Limiting</b> <br>
    Rate Limiting pattern is used to control the rate at which a client can access resources or services. This helps protect the system from being overwhelmed by too many requests in a short period.
    Application: A custom rate limiter using Redis is implemented to control the number of requests a client can make within a certain time window, preventing abuse and ensuring fair usage of the system resources.

## Setup and installation
Please add your own credentials for ethereal email service <br>
`
EMAIL_USER=example@ethereal.email 
`
`
EMAIL_PASS=examplEPassGivenByaservice1123
`

## Build and run docker 
`
docker compose up --build
`

## Build and run docker 
The application will be available at `http://localhost.`

## Running tests  
`
docker compose run test
`
