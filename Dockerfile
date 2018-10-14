FROM openjdk:8-jdk-alpine
ADD /target/hotels.jar hotels.jar
ENTRYPOINT ["java","-jar","hotels.jar"]