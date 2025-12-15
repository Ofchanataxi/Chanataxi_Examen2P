FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY target/Chanataxi_Leccion2-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]