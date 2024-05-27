CREATE TABLE doctors (
                         id SERIAL PRIMARY KEY,
                         nome VARCHAR(100) NOT NULL,
                         email VARCHAR(100) NOT NULL,
                         crm VARCHAR(20) NOT NULL,
                         especialidade VARCHAR(100) NOT NULL,
                         logradouro VARCHAR(100) NOT NULL,
                         bairro VARCHAR(100) NOT NULL,
                         cep VARCHAR(9) NOT NULL,
                         complemento VARCHAR(100),
                         numero VARCHAR(100),
                         uf CHAR(2) NOT NULL,
                         cidade VARCHAR(100) NOT NULL
);
