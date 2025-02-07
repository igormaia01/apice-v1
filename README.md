## **Guia de Instalação e Execução**

### **Pré-requisitos**

- **Docker:**
  - Instale o Docker Desktop seguindo as instruções em: [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **Node.js e npm (ou yarn):**
  - Certifique-se de ter o Node.js e npm (ou yarn) instalados em sua máquina. Você pode baixá-los em: [Node.js](https://nodejs.org/)

### **Passos para configuração**

1. **Subir os containers Docker:**

   ```sh
   docker compose up -d
   ```

   Para saber qual o IP da instância criada

   ```
   sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' instancename
   ```

2. **Instalar as dependências do Node.js:**
   [nvm](https://github.com/nvm-sh/nvm)
   ```sh
   nvm use &&
   npm i
   ```

### **Configurar variáveis de ambiente:**

- Crie um arquivo `.env` utilizando o `.env.example` como modelo.
- Preencha as credenciais necessárias conforme especificado no `docker-compose.yml`.

### **Iniciar o servidor em modo desenvolvimento:**

```sh
npm run start:dev
```

### **Realizando Chamadas para os Endpoints**

- **Insomnia:**
  - Baixe o Insomnia aqui: [Insomnia](https://insomnia.rest/download)
- **Postman:**
  - Baixe o Postman aqui: [Postman](https://www.postman.com/downloads/)
- **Importe a Collection:**
  - Collection Pre-configurada aqui: [Collection](https://drive.google.com/file/d/1iXWGhOpPSryRIW-nOrhHUBTthrOESz9x/view?usp=drive_link)
