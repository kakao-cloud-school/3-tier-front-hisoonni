# 베이스 이미지 설정
FROM ubuntu:20.04

# 기본 의존성 설치
RUN apt-get update && apt-get install -y vim curl git

# Node.js 설치
RUN curl -fsSL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs

# 작업 디렉토리 설정
WORKDIR /home

# 프론트엔드 저장소 복제
RUN git clone https://github.com/kakao-cloud-school/3-tier-front-hisoonni.git k8s_frontend

# 프론트엔드 디렉토리로 이동
WORKDIR /home/k8s_frontend

# 프론트엔드 의존성 설치
RUN npm install


# 어플리케이션 포트 노출
EXPOSE 3000

# 프론트엔드 어플리케이션 실행
CMD ["npm", "start"]
