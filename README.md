# Desafio de Configuração de Proxy Reverso com Nginx, Node.js e Docker

Neste desafio, você terá a oportunidade de aplicar o que aprendemos sobre a utilização do **Nginx como proxy reverso**. A ideia principal é que, quando um usuário acessar o Nginx, ele fará uma chamada para nossa aplicação Node.js. Essa aplicação, por sua vez, adicionará um registro em nosso banco de dados MySQL, cadastrando um nome na tabela "people".

O retorno da aplicação Node.js para o Nginx deverá ser:

```html
<h1>Full Cycle Rocks!</h1>
'Nome(s) salvo no banco'
```

Além disso, a lista de nomes cadastrada no banco de dados deve ser exibida.

## Instruções

Siga os passos abaixo para configurar o ambiente:

1. **Configuração do MySQL:**
   - O serviço MySQL deve estar configurado para usar volumes, garantindo que os dados não sejam perdidos entre reinicializações.
   - Utilize um script `meu-script.sql` para criar a tabela no banco de dados assim que ele inicializar. O MySQL executará automaticamente os scripts localizados na pasta `docker-entrypoint-initdb.d`.
   **Nesse projeto foi usado init.sql da pasta database
     ```yml
        volumes:
         - ./mysql:/var/lib/mysql
         - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
     ```

2. **Aplicação Node.js:**
   - Crie uma aplicação Node.js para adicionar nomes à tabela `people` no banco de dados MySQL.
   - Utilize o pacote **Dockerize** para garantir que a aplicação Node.js espere até que o banco de dados esteja pronto antes de iniciar.
   - A resposta da aplicação Node.js para o Nginx deve ser `<h1>Full Cycle Rocks!</h1> 'Nome(s) salvo no banco'`.

3. **Configuração do Nginx:**
   - Crie um arquivo `nginx.conf` com a configuração do Nginx como proxy reverso para a aplicação Node.js.
   - No arquivo `nginx.conf`, adicione o seguinte bloco de configuração:

     ```nginx
     server {
       listen 80;

       location / {
         proxy_set_header X-Forwarded-For $remote_addr;
         proxy_set_header Host $http_host;
         proxy_pass http://nodejs:3000;  # Nome do serviço Node.js no docker-compose.yml
       }
     }
     ```

4. **Executando Tudo:**
   - Execute `docker-compose up -d` para iniciar os serviços.
   - Basta acessar o Nginx que estará disponível na porta 8080.
