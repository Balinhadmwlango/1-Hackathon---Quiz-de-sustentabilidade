# Eco Quiz

Projeto feito para o 1° Hackathon voltado aos alunos do curso de informática do Colégio Técnico Antônio Teixeira Fernandes, em 2025, se tratando de um site Web que simula um quiz com perguntas sobre a temática sustentabilidade. Visto que a temática é de suma importância, o quiz propõe um método divertido de ensinar e conscientizar sobre o tema para seus usuários.


# Tecnologias utilizadas

- API do Wikipédia.
- Javacript, HTML e CSS.
- MySql.


# Instrução de instalação

## Pré-requisitos:
- Xampp.
- Visual Studio Code.
- MySQl.
- Opcional para testes: HeidSQL.

## Etapas:
Abra o aplicativo Xampp, aperte o botão start do Apache e do MySql, esperando que ambos os textos fiquem com uma cor verde de fundo, assim garantindo que tudo estará funcionando corretamente e após isso poderá fechar o Xampp. Logo, instale o arquivo zip com o título "quiz_sustentabilidade", aperte para mostrar na pasta quando estiver concluído, em cima do nome do arquivo, aperte o botão direito do mouse e clique em "extrair arquivos" e selecione onde queira extrair os arquivos, pegue a pasta contendo o projeto e arraste até a pasta htdocs, localizada dentro da pasta do Xampp:

```bash
C:/xampp/htdocs
```

Dentro da pasta adicionada no htdocs, terá uma pasta nomeada "banco" e nela conterá o arquivo do banco de dados no MySql, abra esse arquivo e no topo da tela aperte em Database, vai aparecer novas funções e aperte em Forward Engineer, uma tela aparecerá e aperte no botão next até o botão finish aparecer e aperte nesse botão também.

Abra o Visual Studio Code, na tela inicial, clique em open folder, procure a pasta htdocs e aperte em selecionar pasta, com todos os arquivos carregados, no topo da tela clique em View e logo clique em Terminal, com o terminal aberto, digite em ordem:

```bash
cd C:\xampp\htdocs\quiz_sustentabilidade\backend

npm install express mysql2 cors (aguarde o programa instalar)

node app.js
```

Assim que digitar o último comando, aparecerá a mensagem "Servidor backend rodando em http://localhost:3000".


# Como usar?
- Através do explorador de arquivos com a pasta do projeto aberta, clique duas vezes no arquivo "index.html" para abrir, ou no navegador abra o localhost e aperte em "index.html".
- Digite seu nome na tela inicial.
- Responda as 10 perguntas (que serão aleatórias) de verdadeiro ou falso sobre o tema.
- Verifique sua resposta.
- Quando terminar, caso queira jogar novamente, aperte em jogar novamente.


# Licença

Permitimos o uso do programa para uso educacional, para inspiração e uso comercial, desde que antes de usar entrem em contato conosco para avisar sobre.


# Autores
- Professor Bruno Michel Pera: Criou e acompanhou o grupo.
- Sarah Pereira de Souza, Isabela Cordeiro de Macedo Miranda e Sayuri Vidal Nozaki: Desenvolvedoras do Backend.
- Sayuri Vidal Nozaki e Gabriel de Oliveira Fornaziero: Responsáveis pela documentação do projeto.
- ⁠Murilo de Faria da Rosa, Anna Gabriela Lopes Souza, Nícolas Landin Cassal dos Santos, Thiago Teodoro Costa, ⁠Nicolle Fernandes Bicudo e Danilo Innocenti: Testers e desenvolvedores do Frontend.





<img width="1364" height="621" alt="image" src="https://github.com/user-attachments/assets/3b5c7527-c3ad-487f-99b9-2f8c834ed7b5" />
<img width="1365" height="639" alt="image" src="https://github.com/user-attachments/assets/9808477c-326f-4a63-bbb6-ef16252c0e42" />

