# Como migrar um REST em FWREST para uso com Annotation

Nesse projeto [ **migrate-FWrest-2-tlpp** ] iremos exemplificar através de códigos fontes em ADVPL e TL++ as duas formas de criar serviços REST.

A primeiro forma será como se cria um serviço REST utilizando o framework Protheus em ADVPL e a segunda como se cria o mesmo serviço REST, porém agora utilizando o recurso de Annotation em TL++.

Sendo assim, teremos 3 (três) códigos fontes, sendo:

Pasta  | Nome arquivo | Linguagem | Tecnologia | Estrutura
:-- | :--| :-- | :-- | :--
src\ | _rest-mod01.prw_  | ADVPL | framework Protheus | classe própria para REST
src\ | _rest-mod02.tlpp_ | TL++ | annotation | user Function
src\ | _rest-mod03.tlpp_ | TL++ | annotation | classe genérica


---
## Características

##### Dependências técnicas

* **FWREST**

    1. Binário Lobo-Guará
    2. Protheus
    3. Framework Protheus
    4. License Protheus
    5. Conhecimento de Classe

* **Annotation**

    1. Binário Lobo-Guará
    2. Core TL++
    3. Conhecimento de annotation


##### Verbos HTTP suportados

* **FWREST**

    - [x] GET
    - [x] POST
    - [x] PUT
    - [ ] PATCH
    - [x] DELETE

* **Annotation**

    - [x] GET
    - [x] POST
    - [x] PUT
    - [x] PATCH
    - [x] DELETE


---
## Resumo das mudanças

#### Cabeçalho arquivo fonte

* **FWREST**

    ```vb
    #include 'totvs.ch'
    #include "restful.ch"
    ```

* **Annotation**

    ```vb
    #include "tlpp-core.th"
    #include "tlpp-rest.th"
    ```

#### Definição do Verbo HTTP

* **FWREST**

    Para utilizar o WSMETHOD é necessário criar antes WSRESTFUL, tal como é uma declaração de classes, porém com sintaxe específica para o REST.

    ```vb
    WSMETHOD GET
    ```

* **Annotation**

    Nesse caso não há dependência de nenhuma classe e é possível utilizar em funções de usuários, funções e métodos de classes, ficando à gosto do desenvolvedor.

    ```vb
    @Get()
    ```

#### EndPoint

* **FWREST**

    A composição para a definição de endpoints nessa versão é composta em dois elementos no fonte.

    O primeiro é propriamente o nome da classe te Restful, sendo:

    ```vb
    WSRESTFUL sampleMigrateRestProtheus
    ```

    A outra parte é complementada através da definição da classe, sendo:

    ```vb
    WSMETHOD POST  ....... WSSYNTAX "/sampleMigrateRestProtheus/{id}"
    ```

    Podendo ter alterações pelo comando PATH, ex:

    ```vb
    WSMETHOD POST ........ PATH  "/v2/sampleMigrateRestProtheus/{id}"
    ```

* **Annotation**

    Por esse modo, você pode criar o endpoint sem qualquer relação ao nome da classe ou função que será executada.

    A definição do endpoint é através da propriedade "endpoint" da annotation, porém, como ela é a primeira propriedade, pode-se simplesmente colocar seu valor sem nomear a propridade.

    O exemplo abaixo é a forma simples de definir um endpoint:

    ```vb
    @Get("/sampleMigrateRestTlpp")
    ```

    Pode-se também, definir os path params como segue abaixo:

    ```vb
    @Get("/sampleMigrateRestTlpp/:id")
    ```

    Também é possível definir uma descrição para o endpoint, ex:

    ```vb
    @Get(endpoint="/sampleMigrateRestTlpp",description="descrição do método Get")
    ```


#### Parâmetros [ Path Param ]

Essa é forma de passar valores através de URI como complementos dos paths, ex:
http://localhost:8080/nomerest/cliente/:2345

No exemplo acima, 2345 é o path param para o ID do cliente.

* **FWREST**

    Esse modo é possível resgatar os valores de path param através da propriedade (array) ::aURLParms, conforme exemplo abaixo:

    ```vb
    if len(::aURLParms) > 0
        cId := ::aURLParms[1]
    endif
    ```

    Porém, não é possível buscar nominalmente o valor, e somente através da ordem que ele é declarado na URI. <br /><br />

* **Annotation**

    O objeto oRest possui um método específico para retornar somente os parâmetros recebidos via Path Param, sendo:

    ```vb
    jPath := oRest:getPathParamsRequest()
    ```

    O retorno do método é uma estrutura em Json com todos os parâmetros recebidos via path param, sendo assim, é possível resgatar o valor do parâmetro acessando seu valor diretamente no Json através do seu nome.

    Veja abaixo:

    ```vb
    cId := jPath[ 'id' ]
    ```

#### Parâmetros [ Query String ]

Essa é o modo de passar valores através de URL após todos os paths e de forma nomeada, ex:
http://localhost:8080/nomerest/cliente?id=2345

No exemplo acima, o parâmetro leva o nome de "id" e tem o valor de 2345.

* **FWREST**

    Para que possa receber parâmetros via query string, é preciso declará-lo como um parâmetro que o método irá receber, como descrito abaixo:

    ```vb
    WSRESTFUL sampleMigrateRestProtheus ......
        WSDATA id       AS CHARACTER OPTIONAL
    .......

    WSMETHOD GET WSRECEIVE id .....
    ```

    Após isso, pode-se utilizá-lo como abaixo:
    ```vb
    // Para que não seja NIL
    DEFAULT ::id := '' 
    
    // Acessa-se diretamente
    conout( ::id )
    ```

* **Annotation**

    O objeto oRest possui um método específico para retornar somente os parâmetros recebidos via query string, sendo:

    ```vb
    jPath := oRest:getQueryRequest()
    ```

    O retorno do método é uma estrutura em Json com todos os parâmetros recebidos via query string, sendo assim, é possível resgatar o valor do parâmetro acessando seu valor diretamente no Json através do seu nome.

    Veja abaixo:

    ```vb
    cId := jPath[ 'id' ]
    ```


#### Parâmetros [ Body HTTP ]

* **FWREST**

    ```vb
    cBody := ::GetContent()
    ```

* **Annotation**

    ```vb
    cBody := oRest:GetBodyRequest()
    ```

#### Return OK

* **FWREST**

    ```vb
    ::SetResponse( cResponse )
    ```

* **Annotation**

    ```vb
    oRest:setResponse( cResponse )
    ```

#### Return Error

* **FWREST**

    ```vb
    SetRestFault( nCodeHttp, cMessage )
    ```

* **Annotation**

    ```vb
    oRest:setFault( cResponse )
    ```

    Nesse caso o código HTTP do retorno será 500, caso tenha a necessidade de trocar o código HTTP, utilize antes o método conforme abaixo:

    ```vb
    oRest:setStatusCode( nCodeHttp )
    oRest:setFault( cResponse )
    ```

---
## Exemplos

> É importante ressaltar que para simplificar este manual iremos unificar os verbos HTTP "PUT", "POST" e "PATCH", pois possuem funcionalidades similares no uso em APIs em REST. Porém nos arquivos acima descritos todos os exemplos estarão presentes.

#### Exemplo GET

* **FWREST**

    ```vb
    WSRESTFUL sampleMigrateRestProtheus DESCRIPTION "Exemplo de REST framework Protheus"

        WSDATA id       AS CHARACTER OPTIONAL

        WSMETHOD GET    DESCRIPTION "Método Get"    WSSYNTAX "/sampleMigrateRestProtheus"

    END WSRESTFUL


    WSMETHOD GET WSRECEIVE id WSSERVICE sampleMigrateRestProtheus

        local cData := ''

        ::SetContentType("application/json")

        DEFAULT ::id := ''

        cData := '{ "METHOD" : "GET" ,"id" : "' + ::id + '" }'

        ::SetResponse( cData )
    Return .T.
    ```

* **Annotation**

    ```vb
    @Get("/sampleMigrateRestTlpp")
    user function GETsampleMigrateRestTlpp()

        local cId   := ''
        local cData := ''
        local jPath

        jPath := oRest:getQueryRequest()
        if ( jPath <> Nil )
            cId := jPath[ 'id' ]
            if ( valtype(cId) == 'U' )
                cId := ''
            endif
        endif

        cData := '{ "METHOD" : "GET" ,"id" : "' + cId + '" }'

    return oRest:setResponse( cData )
    ```

#### Exemplo POST

* **FWREST**

    ```vb
    WSRESTFUL sampleMigrateRestProtheus DESCRIPTION "Exemplo de REST framework Protheus"
        WSMETHOD POST   DESCRIPTION "Método Post"   WSSYNTAX "/sampleMigrateRestProtheus/{id}"
    END WSRESTFUL

    WSMETHOD POST WSSERVICE sampleMigrateRestProtheus

        local cId   := ''
        local cBody := ''
        local jBody

        ::SetContentType("application/json")

        if len(::aURLParms) > 0
            cId := ::aURLParms[1]
        endif

        ::SetResponse( '{ "METHOD" : "POST" ,"id" : "' + cId + '" ' )

        cBody := ::GetContent()
        jBody := JsonObject():new()
        jBody:fromJson( cBody )
        if ( jBody <> Nil )
            if ( !empty(jBody:GetJsonText("cpo1")) )
                ::SetResponse( ', "cpo1" : "' + jBody:GetJsonText("cpo1") + '" ' )
            endif
            if ( !empty(jBody:GetJsonText("cpo2")) )
                ::SetResponse( ', "cpo2" : "' + jBody:GetJsonText("cpo2") + '" ' )
            endif
        endif

        ::SetResponse( ' }' )
    Return .T.
    ```

* **Annotation**

    ```vb
    @Post("/sampleMigrateRestTlpp/:id")
    user function PostsampleMigrateRestTlpp()

        local cId   := ''
        local cData := ''
        local jPath
        local jBody

        jPath := oRest:getPathParamsRequest()
        if ( jPath <> Nil )
            cId := jPath[ 'id' ]
            if ( valtype(cId) == 'U' )
                cId := ''
            endif
        endif

        cData := '{ "METHOD" : "POST" , "id" : "' + cId + '" '

        jBody := JsonObject():new()
        jBody:fromJson( oRest:GetBodyRequest() )
        if ( jBody <> Nil )
            if ( !empty(jBody:GetJsonText("cpo1")) )
                cData += ', "cpo1" : "' + jBody:GetJsonText("cpo1") + '" '
            endif
            if ( !empty(jBody:GetJsonText("cpo2")) )
                cData += ', "cpo2" : "' + jBody:GetJsonText("cpo2") + '" '
            endif
        endif

        cData += '}'

    return oRest:setResponse( cData )
    ```

#### Exemplo DELETE

* **FWREST**

    ```vb
    WSRESTFUL sampleMigrateRestProtheus DESCRIPTION "Exemplo de REST framework Protheus"
        WSMETHOD DELETE DESCRIPTION "Método Delete" WSSYNTAX "/sampleMigrateRestProtheus/{id}"
    END WSRESTFUL

    WSMETHOD DELETE WSSERVICE sampleMigrateRestProtheus

        local cId   := ''
        local cData := ''

        ::SetContentType("application/json")

        if len(::aURLParms) > 0
            cId := ::aURLParms[1]
        endif

        cData := '{ "METHOD" : "DELETE" ,"id" : "' + cId + '" }'

        ::SetResponse( cData )
    Return .T.
    ```

* **Annotation**

    ```vb
    @Delete("/sampleMigrateRestTlpp/:id")
    user function DeletesampleMigrateRestTlpp()

        local cId   := ''
        local cData := ''
        local jPath

        jPath := oRest:getPathParamsRequest()
        if ( jPath <> Nil )
            cId := jPath[ 'id' ]
            if ( valtype(cId) == 'U' )
                cId := ''
            endif
        endif

        cData := '{ "METHOD" : "DELETE" , "id" : "' + cId + '" ' + '}'

    return oRest:setResponse( cData )
    ```