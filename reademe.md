# <p align = "center"> Projeto DrivenPass </p>

<p align="center">
   <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f512.svg"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Josimar-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/perseu120
/
projeto19-drivenpass?color=4dae71&style=flat-square" />
</p>


## Descrição

projeto desenvolvido para a driven education onde foi feito um backand usando Node.js e implementando o tipeScript e usando arquiteture

***

## :computer:	 Tecnologias e Conceitos

- REST APIs
- JWTs
- Node.js
- TypeScript

***

## :rocket: Rotas

```yml
POST /create
    - Rota para cadastrar um novo usuário
    - headers: {}
    - body:{
        "email": "lorem@gmail.com",
        "senha": "loremipsum"
}
```
    
```yml 
POST /login
    - Rota para fazer login
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
    "senha": "loremipsum"
    }
```
    
```yml 
POST /credentials (autenticada)
    - Rota para salvar as informações de login de um site
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /credentials/:id
    - Rota para retornar as credenciais salvas pelo ID
    - headers: { }
    - body: {}
``` 

```yml
GET /credentials
    - Rota para retornar as credenciais salvas
    - headers: { }
    - body: { }
```