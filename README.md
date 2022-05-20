<h1>Hello world!!! <h1>
<h2>Como rodar o projeto <h2><br>
<h3>Requisitos<h3>
1. Docker e Docker compose
<h3>Comandos <h3>
<code>docker compose up</code>
<h3>O que tem aqui?<h3>
<li>Sign Up com senha cryptografada e também envio de email para validação do registro</li>
<li>Sign In com authenticação JWT, com middleware de authenticação para determinadas tarefas/rotas</li>
<li>Recovery password enviando um token para o email para validar na hora de enviar nova senha</li>
<li>Logout, inserindo os tokens em uma black list</li>
