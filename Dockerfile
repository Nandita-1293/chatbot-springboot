FROM eclipse-temurin:17-jdk AS builder
WORKDIR /app
COPY . .
RUN chmod +x mvnw || true
RUN ./mvnw clean package -DskipTests || mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 10000
CMD ["java", "-jar", "app.jar", "--server.port=10000"]
