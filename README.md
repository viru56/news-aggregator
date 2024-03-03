# React News Aggregator Project

This is a test project  - [Demo Link](https://main--news-aggregator-vn.netlify.app/)

### Create a .env file and add your project keys.  You can find the keys in .env.example file.

#### How to run this project locally

## Installation

```bash
npm install
```

## Run

```bash
npm run dev
```


## How to run project with Docker
Please make sure you have docker installed

# Create docker image

```bash
docker build .  -t news-aggregator
```

# Run docker 

```bash
docker run -dp 8080:8080 news-aggregator
```