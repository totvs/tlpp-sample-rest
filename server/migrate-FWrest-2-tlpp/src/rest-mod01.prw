#INCLUDE 'totvs.ch'
#INCLUDE "restful.ch"


WSRESTFUL sampleMigrateRestProtheus DESCRIPTION "Exemplo de REST utilizando recursos do framework do Protheus"

    WSDATA id       AS CHARACTER OPTIONAL

    WSMETHOD GET    DESCRIPTION "Método Get"    WSSYNTAX "/sampleMigrateRestProtheus"
    WSMETHOD POST   DESCRIPTION "Método Post"   WSSYNTAX "/sampleMigrateRestProtheus/{id}"
    WSMETHOD PUT    DESCRIPTION "Método Put"    WSSYNTAX "/sampleMigrateRestProtheus/{id}"
    WSMETHOD DELETE DESCRIPTION "Método Delete" WSSYNTAX "/sampleMigrateRestProtheus/{id}"

END WSRESTFUL



WSMETHOD GET WSRECEIVE id WSSERVICE sampleMigrateRestProtheus

    local cData := ''

    // define o tipo de retorno do método
    ::SetContentType("application/json")

    DEFAULT ::id := ''

    cData := '{ "METHOD" : "GET" ,"id" : "' + ::id + '" }'

    ::SetResponse( cData )
Return .T.



WSMETHOD POST WSSERVICE sampleMigrateRestProtheus

    local cId   := ''
    local cBody := ''
    local jBody

    // define o tipo de retorno do método
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



WSMETHOD PUT WSSERVICE sampleMigrateRestProtheus

    local cId   := ''
    local cBody := ''
    local jBody

    // define o tipo de retorno do método
    ::SetContentType("application/json")

    if len(::aURLParms) > 0
        cId := ::aURLParms[1]
    endif

    ::SetResponse( '{ "METHOD" : "PUT" ,"id" : "' + cId + '" ' )

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



WSMETHOD DELETE WSSERVICE sampleMigrateRestProtheus

    local cId   := ''
    local cData := ''

    // define o tipo de retorno do método
    ::SetContentType("application/json")

    if len(::aURLParms) > 0
        cId := ::aURLParms[1]
    endif

    cData := '{ "METHOD" : "DELETE" ,"id" : "' + cId + '" }'

    ::SetResponse( cData )
Return .T.
