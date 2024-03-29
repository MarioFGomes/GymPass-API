# App

GymPass style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [X] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o usuário buscar academia pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia
- [x] Como usuario deve ser possível ter uma foto de perfil
- [X] Deve ser possível o Gym ter um Logo

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com e-mail duplicado
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-ins se não estiver perto (100m) da academia;
- [X] O check-in só pode ser validado até 20 minutos após criado;
- [X] O check-in só pode ser validado por administradores;
- [X] A academia só pode ser cadastrada por administradores;
- [x] A Foto de perfil deve ser no maximo de 5mb
- [ ] O usuario deve estar logado para adicionar uma foto de perfil

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuario precisa estar criptografada;
- [x] Os dados da aplicação precisam estar presistido em um banco de dados PostgreSQL
- [x] Todas Listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);
- [x] Melhorar a performace da busca do perfil do usuário implementando o cache com redis
- [] Implementar ferramentas de observabilidade para logs e monitoramento
