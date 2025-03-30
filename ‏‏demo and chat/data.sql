-- H2 2.2.224;
SET DB_CLOSE_DELAY -1;        
;             
CREATE USER IF NOT EXISTS "SA" SALT '35b9ab200730c57f' HASH '4b66a0d7f4c67eb08b9749657e176797b745474e1b43131cf65e181f73ee88d8' ADMIN;         
CREATE CACHED TABLE "PUBLIC"."AD"(
    "BUILDING_ID" BIGINT,
    "DATE" TIMESTAMP(6),
    "ID" BIGINT GENERATED BY DEFAULT AS IDENTITY(START WITH 1 RESTART WITH 161) NOT NULL,
    "TEXT" CHARACTER VARYING(255),
    "TITLE" CHARACTER VARYING(255)
);
ALTER TABLE "PUBLIC"."AD" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_8" PRIMARY KEY("ID");           
-- 3 +/- SELECT COUNT(*) FROM PUBLIC.AD;      
INSERT INTO "PUBLIC"."AD" VALUES
(129, TIMESTAMP '2025-02-10 11:05:00', 65, 'rtyuioiu', '2ngk'),
(193, TIMESTAMP '2025-03-12 21:36:00', 97, 'jjjjj', 'jjjj'),
(225, TIMESTAMP '2025-03-13 10:37:00', 129, '2222', '2222'); 
CREATE CACHED TABLE "PUBLIC"."BUILDING"(
    "MONTH_PRICE" FLOAT(53) NOT NULL,
    "ID" BIGINT GENERATED BY DEFAULT AS IDENTITY(START WITH 1 RESTART WITH 257) NOT NULL,
    "ADDRESS" CHARACTER VARYING(255)
);          
ALTER TABLE "PUBLIC"."BUILDING" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_D" PRIMARY KEY("ID");     
-- 7 +/- SELECT COUNT(*) FROM PUBLIC.BUILDING;
INSERT INTO "PUBLIC"."BUILDING" VALUES
(150.5, 1, U&'\05e1\05e0\05d3\05e8 \05d7\05d3\05d3 9, \05e4\05ea\05d7 \05ea\05e7\05d5\05d5\05d4, \05d9\05e9\05e8\05d0\05dc'),
(150.0, 65, U&'\05d4\05e8\05d0\05e9\05d5\05e0\05d9\05dd 6, \05e4\05ea\05d7 \05ea\05e7\05d5\05d5\05d4, \05d9\05e9\05e8\05d0\05dc'),
(170.0, 97, U&'\05e1\05e0\05d3\05e8 \05d7\05d3\05d3 3, \05e4\05ea\05d7 \05ea\05e7\05d5\05d5\05d4, \05d9\05e9\05e8\05d0\05dc'),
(100.0, 129, U&'\05e9\05dc\05de\05d4 \05d0\05dc\05e7\05d1\05e5 3, \05d9\05e8\05d5\05e9\05dc\05d9\05dd, \05d9\05e9\05e8\05d0\05dc'),
(115.0, 161, U&'\05de\05e9\05d4 \05e7\05d5\05e8\05d3\05d5\05d1\05d9\05e8\05d5 26, \05d9\05e8\05d5\05e9\05dc\05d9\05dd, \05d9\05e9\05e8\05d0\05dc'),
(120.0, 193, U&'\05e8\05d1\05d9 \05d9\05d4\05d5\05d3\05d4 \05d4\05e0\05e9\05d9\05d0 50, \05e4"\05ea, \05d9\05e9\05e8\05d0\05dc'),
(120.0, 225, U&'\05d9\05d4\05d5\05d3\05d4 \05d4\05e0\05e9\05d9\05d0 50, \05d4\05e8\05e6\05dc\05d9\05d4, \05d9\05e9\05e8\05d0\05dc');  
CREATE CACHED TABLE "PUBLIC"."GROUP_MESSAGE"(
    "BUILDING_ID" BIGINT,
    "DATE" TIMESTAMP(6),
    "ID" BIGINT GENERATED BY DEFAULT AS IDENTITY(START WITH 1 RESTART WITH 225) NOT NULL,
    "SENDER_ID" BIGINT,
    "TEXT" CHARACTER VARYING(255)
); 
ALTER TABLE "PUBLIC"."GROUP_MESSAGE" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_F" PRIMARY KEY("ID");
-- 21 +/- SELECT COUNT(*) FROM PUBLIC.GROUP_MESSAGE;          
INSERT INTO "PUBLIC"."GROUP_MESSAGE" VALUES
(1, TIMESTAMP '2024-12-16 12:35:58', 1, 1, 'hi'),
(1, TIMESTAMP '2024-12-16 12:38:44', 2, 1, 'ia am avital'),
(1, TIMESTAMP '2024-12-16 12:58:15', 3, 33, 'i am alsooooo '),
(1, TIMESTAMP '2024-12-16 12:58:25', 4, 33, U&'very nice to meeet you \+01f44b '),
(1, TIMESTAMP '2024-12-16 17:00:35', 5, 33, 'heiii'),
(1, TIMESTAMP '2024-12-16 17:00:40', 6, 33, 'jjj'),
(1, TIMESTAMP '2024-12-16 22:37:59.339', 33, 1, 'i also think so!!'),
(1, TIMESTAMP '2024-12-16 22:39:38.151', 34, 1, U&'\05d5\05d5\05d5'),
(1, TIMESTAMP '2024-12-16 22:40:43.495', 35, 1, U&'\05d9'),
(1, TIMESTAMP '2024-12-17 00:40:51', 36, 1, U&'\05da'),
(1, TIMESTAMP '2024-12-16 22:49:39.602', 37, 33, 'hiii '),
(1, TIMESTAMP '2024-12-16 22:49:47.684', 38, 33, 'hi'),
(1, TIMESTAMP '2024-12-16 22:49:59.742', 39, 33, 'hi'),
(1, TIMESTAMP '2024-12-17 00:50:13', 40, 33, 'hi'),
(97, TIMESTAMP '2025-01-20 00:35:25', 65, 97, '5555'),
(129, TIMESTAMP '2025-02-10 11:05:47', 97, 129, 'rrr'),
(161, TIMESTAMP '2025-03-08 19:07:39', 129, 161, '123456'),
(193, TIMESTAMP '2025-03-12 21:41:15', 161, 194, U&'\05d4\05d9\05d9 \05db\05d5\05dc\05dd'),
(193, TIMESTAMP '2025-03-12 21:43:55', 162, 193, U&'\05d4\05d9\05d9'),
(193, TIMESTAMP '2025-03-12 21:43:59', 163, 193, U&'\05d0\05e0\05d9 \05d9\05e2\05dc\05d9 '),
(225, TIMESTAMP '2025-03-13 10:37:44', 193, 225, '4444');
CREATE CACHED TABLE "PUBLIC"."MESSAGE"(
    "DATE" TIMESTAMP(6),
    "ID" BIGINT GENERATED BY DEFAULT AS IDENTITY(START WITH 1 RESTART WITH 129) NOT NULL,
    "RECEIVER_ID" BIGINT,
    "SENDER_ID" BIGINT,
    "TEXT" CHARACTER VARYING(255)
);       
ALTER TABLE "PUBLIC"."MESSAGE" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_6" PRIMARY KEY("ID");      
-- 14 +/- SELECT COUNT(*) FROM PUBLIC.MESSAGE;
INSERT INTO "PUBLIC"."MESSAGE" VALUES
(TIMESTAMP '2024-12-16 12:54:35', 1, 1, 33, 'hello1'),
(TIMESTAMP '2024-12-16 12:56:51', 2, 1, 33, U&'\05d4\05d9\05d5\05e9'),
(TIMESTAMP '2024-12-16 12:57:15', 3, 1, 33, U&'\05de\05d4 \05e0\05e9\05de\05e2?'),
(TIMESTAMP '2024-12-16 12:57:15', 4, 1, 33, U&'\05d1\05e1\05d3\05e8?'),
(TIMESTAMP '2024-12-16 12:57:15', 5, 1, 33, U&'\05d9\05e7\05da\05da\05dd?'),
(TIMESTAMP '2024-12-16 12:57:15', 6, 1, 33, 'hello?'),
(TIMESTAMP '2024-12-16 12:57:15', 7, 1, 33, U&'\+01f44b '),
(TIMESTAMP '2024-12-17 00:37:35', 33, 33, 1, 'hello man!!'),
(TIMESTAMP '2024-12-17 00:39:43', 34, 33, 1, U&'\05d7'),
(TIMESTAMP '2024-12-17 00:39:43', 35, 33, 1, U&'\05dc'),
(TIMESTAMP '2024-12-17 00:39:43', 36, 33, 1, U&'\05dc\05de\05d4'),
(TIMESTAMP '2025-01-20 00:36:58', 65, 97, 98, '5555'),
(TIMESTAMP '2025-03-12 21:41:26', 97, 193, 194, U&'\05d4\05d9\05d5\05e9 \05d9\05e2\05dc\05d9 '),
(TIMESTAMP '2025-03-12 21:42:01', 98, 194, 193, U&'\05d4\05d9\05d5\05e9\05e9\05e9');   
CREATE CACHED TABLE "PUBLIC"."PAYMENT"(
    "IS_PAID" BOOLEAN,
    "PRICE" FLOAT(53),
    "DATE" TIMESTAMP(6),
    "ID" BIGINT GENERATED BY DEFAULT AS IDENTITY(START WITH 1 RESTART WITH 193) NOT NULL,
    "USER_ID" BIGINT
);        
ALTER TABLE "PUBLIC"."PAYMENT" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_FB" PRIMARY KEY("ID");     
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.PAYMENT;
INSERT INTO "PUBLIC"."PAYMENT" VALUES
(TRUE, 150.5, TIMESTAMP '2024-12-17 00:41:00', 33, 1),
(TRUE, 150.5, TIMESTAMP '2024-12-16 22:56:00', 34, 1),
(TRUE, 150.5, TIMESTAMP '2024-12-16 22:56:00', 35, 33),
(TRUE, 170.0, TIMESTAMP '2025-01-20 00:35:00', 65, 97),
(FALSE, 170.0, TIMESTAMP '2025-01-19 22:37:00', 66, 97),
(FALSE, 170.0, TIMESTAMP '2025-01-19 22:37:00', 67, 98),
(FALSE, 100.0, TIMESTAMP '2025-02-10 09:05:00', 97, 129),
(TRUE, 120.0, TIMESTAMP '2025-03-12 19:42:00', 129, 193),
(FALSE, 120.0, TIMESTAMP '2025-03-12 19:42:00', 130, 194),
(TRUE, 120.0, TIMESTAMP '2025-03-13 08:39:00', 161, 225);      
CREATE CACHED TABLE "PUBLIC"."USERS"(
    "APARTMENT_NUMBER" INTEGER NOT NULL,
    "FLOOR" INTEGER NOT NULL,
    "BUILDING_ID" BIGINT,
    "ID" BIGINT GENERATED BY DEFAULT AS IDENTITY(START WITH 1 RESTART WITH 257) NOT NULL,
    "EMAIL" CHARACTER VARYING(255),
    "PASSWORD" CHARACTER VARYING(255),
    "PHONE" CHARACTER VARYING(255),
    "STATUS" CHARACTER VARYING(255),
    "USER_NAME" CHARACTER VARYING(255)
);      
ALTER TABLE "PUBLIC"."USERS" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_4D" PRIMARY KEY("ID");       
-- 11 +/- SELECT COUNT(*) FROM PUBLIC.USERS;  
INSERT INTO "PUBLIC"."USERS" VALUES
(11, 5, 1, 1, 'a0583236811@gmail.com', 'AvitalB2004', '058-3236812', 'MANAGER', 'avital'),
(12, 5, 1, 33, 'ne.busso@gmail.com', 'AvitalB2004', '058-3236811', 'TENANT', 'nechama'),
(10, 4, 1, 34, 'db0583236812@gmail.com', 'AvitalB2004', '0583236814', 'TENANT', 'David'),
(11, 4, 97, 97, 'a0583236811@gmail.com', 'AvitalB2004', '058-3236811', 'TENANT', 'AAvv'),
(11, 4, 97, 98, 'a0583236811@gmail.com', 'AvitalB2004', '058-3236811', 'MANAGER', 'AAAvv'),
(13, 3, 129, 129, 'a0583236811@gmail.com', 'Ab123456', '058-3236811', 'MANAGER', U&'\05d9\05e9\05e8\05d0\05dc \05e4\05e8\05e5'),
(12, 2, 161, 161, 'a0583236811@gmail.com', 'Ab123456', '058-3236811', 'MANAGER', 'yog'),
(1, 4, 193, 193, 'a0583236811@gmail.com', 'Ab123456', '058-3236811', 'TENANT', U&'\05d9\05e2\05dc\05d9'),
(11, 6, 193, 194, 'a0583236811@gmail.com', 'Ab123456', '058-3236811', 'MANAGER', U&'\05d3\05d5\05d3'),
(11, 9, 225, 225, 'a0583236811@gmail.com', 'Ab123456', '058-3236811', 'MANAGER', U&'\05d0\05d1\05d9\05d8\05dc 123'),
(11, 2, 225, 226, 'a0583236811@gmail.com', 'Ab123456', '058-3236811', 'TENANT', U&'\05d0\05d1\05d9\05d8\05dc 1234');       
ALTER TABLE "PUBLIC"."USERS" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_4" CHECK("STATUS" IN('MANAGER', 'TENANT')) NOCHECK;          
ALTER TABLE "PUBLIC"."MESSAGE" ADD CONSTRAINT "PUBLIC"."FKBI5AVHE69AOL2MB1LNM6R4O2P" FOREIGN KEY("SENDER_ID") REFERENCES "PUBLIC"."USERS"("ID") NOCHECK;      
ALTER TABLE "PUBLIC"."GROUP_MESSAGE" ADD CONSTRAINT "PUBLIC"."FK7LJGKL4GN1UM4ERPAS9GU5M4A" FOREIGN KEY("SENDER_ID") REFERENCES "PUBLIC"."USERS"("ID") NOCHECK;
ALTER TABLE "PUBLIC"."AD" ADD CONSTRAINT "PUBLIC"."FKPIESM9ENWHRUIC3NN3IBPYHOP" FOREIGN KEY("BUILDING_ID") REFERENCES "PUBLIC"."BUILDING"("ID") NOCHECK;      
ALTER TABLE "PUBLIC"."GROUP_MESSAGE" ADD CONSTRAINT "PUBLIC"."FKRF41F1U4KR64J7DW5RSABYCX9" FOREIGN KEY("BUILDING_ID") REFERENCES "PUBLIC"."BUILDING"("ID") NOCHECK;           
ALTER TABLE "PUBLIC"."USERS" ADD CONSTRAINT "PUBLIC"."FKDYTQIN0J087QU69JVC9695WFF" FOREIGN KEY("BUILDING_ID") REFERENCES "PUBLIC"."BUILDING"("ID") NOCHECK;   
ALTER TABLE "PUBLIC"."PAYMENT" ADD CONSTRAINT "PUBLIC"."FKMI2669NKJESVP7CD257FPTL6F" FOREIGN KEY("USER_ID") REFERENCES "PUBLIC"."USERS"("ID") NOCHECK;        
