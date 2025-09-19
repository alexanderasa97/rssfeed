# Projeto: Sistema de Feed RSS BBC News

## 📌 Descrição do Projeto

O Sistema de Feed RSS BBC News é uma aplicação web desenvolvida para coletar, armazenar e exibir notícias da BBC através de seu feed RSS. A aplicação utiliza Node.js no backend para extrair as informações do feed RSS e integra-se com a AWS S3 para armazenamento das notícias em formato JSON. O frontend simples permite aos usuários visualizar as notícias atualizadas e solicitarem atualizações de dados.

O principal objetivo é permitir o consumo de notícias atualizadas da BBC, com armazenamento em nuvem na AWS e apresentação através de uma interface web simples e funcional.

## 🛠️ Ferramentas Utilizadas

* **Node.js/Express** 
* **AWS**
   * Amazon S3 (armazenamento de notícias)
* **Docker** 
* **HTML/CSS/JavaScript** 
* **Git** 
* **Visual Studio Code** 

## 🚀 Como Utilizar o Sistema

### Pré-requisitos

Você precisa ter o seguinte instalado na sua máquina:
* Node.js (v18 ou superior) ou Docker

### Como rodar localmente

#### 1 - Clonar o repositório

Abra o terminal e execute:

```
git clone https://seu-repositorio-bbc-rss.git
cd seu-repositorio-bbc-rss
```

#### 2 - Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
AWS_REGION=us-east-1
BUCKET_NAME=bbc-news-bucket-sprint2e3
PORT=3000
```

#### 3 - Método 1: Executar com Node.js

Instale as dependências e inicie a aplicação:

```
npm install
node indexraiz.js
```

#### 3 - Método 2: Executar com Docker

Com o terminal dentro da pasta do projeto, execute o seguinte comando:

```
docker-compose up --build
```

Este comando:
* Constrói a imagem Docker da aplicação
* Instala todas as dependências do projeto
* Inicia o servidor na porta 3000

#### 4 - Acessar a aplicação no navegador local

Após a inicialização, você poderá acessar:
* Interface Web: http://localhost:3000

#### 5 - Parar a aplicação

Para interromper a aplicação:
* Se estiver usando Node.js: Pressione CTRL + C no terminal
* Se estiver usando Docker: Pressione CTRL + C e execute `docker-compose down`

## Funcionalidades Principais

1. **Busca de Notícias**: Extrai dados atualizados do feed RSS da BBC News
2. **Armazenamento em Nuvem**: Salva os dados obtidos no Amazon S3
3. **Visualização de Notícias**: Apresenta as notícias em uma interface web simples
4. **Atualização Manual**: Permite ao usuário solicitar atualizações dos dados

## 📋 Estrutura do Projeto

```
sprints-2-3-pb-aws-marco/
├── api/
│   ├── rss/
│   │   ├── fetchRss.js
│   │   └── index.js
│   ├── s3/
│   │   ├── configS3.js
│   │   ├── downloadJson.js
│   │   ├── uploadJson.js
│   │   └── verificationLog.js
│   └── index.js
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── index.html
├── .env
├── .gitignore
├── bbc-news.json
├── bbc-rss-key.pem
├── docker-compose.yml
├── Dockerfile
├── indexraiz.js
├── notepad.md
├── package-lock.json
├── package.json
└── README.md
```

## 🌐 URL de Acesso

http://44.196.30.136:3000/

## 📝 Integrantes (Grupo 3)

* Alexander Andrade
* Davi Ramos
* Gabriel Xavier
* Victoria Mayara