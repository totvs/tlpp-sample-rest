# tlpp-sample-rest

Exemplos para criar um CRUD através do Webservice REST TL++

**Resumo**

Para entender o funcionamento de todas as opções, iremos utilizar um exemplo muito simples de cadastro de Usuários de um Sistema.

Com isso, para facilitar o entendimento, criamos um roteiro a seguir e assim, passo a passo, executaremos todas as opções desenvolvidas nesse projeto de exemplo.

- - -


## Roteiro de teste



**1 - Criar base de dados**

Para todos os exemplos, precisaremos de uma Base de Dados e para facilitar a infraestrutura utilizada, faremos uso do SQLite para que não seja necessário baixar e configurar o TOTVS Dbaccess e instalar nenhum BD.

Portanto, teremos que seguir os passos abaixo:

```txt

a - Verificar na pasta ROOT que não tenha nenhuma base SQLite existente, se houver, delete.

b - Subir appserver

c - Executar a rotina -> sampleCRUDtlppRestgenerateTables

```



**2 - Cria usuário (POST)**

Escolha uma das opções abaixo:

```html

a - http://127.0.0.1:9080/sample/rest/crud/body
	com
	{"user":"ana","password":"senha@123","nick":"batatinha","name":"Ana Camargo"}

b - http://127.0.0.1:9080/sample/rest/crud/query?user=ana&password=senha@123&name=Ana%20Camargo&nick=batatinha

c - http://127.0.0.1:9080/sample/rest/crud/path/ana/senha@123/Ana%20Camargo/batatinha

```



**3 - Consulta (GET)**

Escolha uma das opções abaixo:

```html

a - http://127.0.0.1:9080/sample/rest/crud/body
	com
	{"user":"ana"}
	
b - http://127.0.0.1:9080/sample/rest/crud/query?user=ana

c - http://127.0.0.1:9080/sample/rest/crud/path/ana

```



**4 - Altera usuário (PUT) [dados completos] **

Escolha uma das opções abaixo:

```html

a - http://127.0.0.1:9080/sample/rest/crud/body
    com
    {"user":"ana","password":"senha@1234","name":"Ana Camargo","nick":"aninha"}

b - http://127.0.0.1:9080/sample/rest/crud/query?user=ana&password=senha@1234&name=Ana%20Ferreira&nick=aninha

c - http://127.0.0.1:9080/sample/rest/crud/path/ana/senha@1234/Ana%20Julia/aninha

```



**5 - Altera usuário (PATCH) [dados parciais]**

Escolha uma das opções abaixo:

```html

a - http://127.0.0.1:9080/sample/rest/crud/body
    com
    {"user":"jose","name":"Josival","nick":"zezinho"}

b - http://127.0.0.1:9080/sample/rest/crud/query?user=jose&name=Josival&nick=zezinho

c - http://127.0.0.1:9080/sample/rest/crud/path/jose/Josival/zezinho

```

> *Atenção:* Esse modo, não é possível alterar o valor da senha.



**6 - Exclui usuário (DELETE)**

Escolha uma das opções abaixo:

```html

a - http://127.0.0.1:9080/sample/rest/crud/body
	com
	{"user": "ana"}

b - http://127.0.0.1:9080/sample/rest/crud/query?user=ana

c - http://127.0.0.1:9080/sample/rest/crud/path/ana

```



**7 - Validação de usuário e senha**

```html

[GET]

http://127.0.0.1:9080/sample/rest/crud/valid
{"user":"jose","password":"senha@123"}

```
