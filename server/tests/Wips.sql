--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2022-05-21 21:51:07

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 204 (class 1259 OID 51029)
-- Name: Followers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Followers" (
    "followId" uuid NOT NULL,
    "profileId" uuid,
    "followerId" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Followers" OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 50972)
-- Name: Login; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Login" (
    "loginId" uuid NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "profileId" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Login" OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 50964)
-- Name: Profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Profile" (
    "profileId" uuid NOT NULL,
    name character varying(255) NOT NULL,
    type character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Profile" OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 50985)
-- Name: WipCollections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."WipCollections" (
    "wipCollectionId" uuid NOT NULL,
    "wipCollectionTitle" character varying(255) NOT NULL,
    "profileId" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."WipCollections" OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 50995)
-- Name: Wips; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Wips" (
    "wipId" uuid NOT NULL,
    "wipTitle" character varying(255) NOT NULL,
    "wipImage" character varying(255) NOT NULL,
    "uploadDate" character varying(255) DEFAULT '1647362974052'::character varying NOT NULL,
    "wipCollectionId" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Wips" OWNER TO postgres;

--
-- TOC entry 3016 (class 0 OID 51029)
-- Dependencies: 204
-- Data for Name: Followers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Followers" ("followId", "profileId", "followerId", "createdAt", "updatedAt") VALUES ('678721db-eaaf-47f8-a933-4b7f495ba787', '92f5aaa1-254e-4688-84b0-049424718b4e', '62d8e030-34af-46ea-89b1-f6b6d3fa13b5', '2022-03-16 19:29:53.363-07', '2022-03-16 19:29:53.363-07');


--
-- TOC entry 3013 (class 0 OID 50972)
-- Dependencies: 201
-- Data for Name: Login; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Login" ("loginId", email, password, "profileId", "createdAt", "updatedAt") VALUES ('0ae1a98a-70bd-44e0-bb9f-64d88f34edd9', 'dgreenleaf@greenleaf.org', '$2b$12$gsoTLiNFe0J9pIwgfk/snePuA.Mv2DO/0twVpPh3SXCeQmrJICCUS', '92f5aaa1-254e-4688-84b0-049424718b4e', '2022-03-15 09:50:19.051-07', '2022-05-16 17:12:54.184-07');
INSERT INTO public."Login" ("loginId", email, password, "profileId", "createdAt", "updatedAt") VALUES ('54a76d7e-dfca-4cd6-9f71-a6fa34948894', 'eredding@shawshank.org', '$2b$12$LMhynkyE66FcLos022jVUu.iF.6NN1dtINILmtP9NLIl.kqOxHVIi', 'c6f37d52-5c4c-4baf-8fae-ba24ebf20f46', '2022-03-17 00:28:29.792-07', '2022-03-17 10:00:54.483-07');
INSERT INTO public."Login" ("loginId", email, password, "profileId", "createdAt", "updatedAt") VALUES ('cabd9821-9346-44e6-a521-1649cf2cfb38', 'freddie@greenleaf.org', '$2b$12$0AMCz71pe29jdAqbBv7ah.ic9na6v2DWpmWrbVtsPUgRFeIhg4lKe', '62d8e030-34af-46ea-89b1-f6b6d3fa13b5', '2022-03-15 17:20:44.23-07', '2022-03-15 17:20:44.23-07');


--
-- TOC entry 3012 (class 0 OID 50964)
-- Dependencies: 200
-- Data for Name: Profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Profile" ("profileId", name, type, "createdAt", "updatedAt") VALUES ('92f5aaa1-254e-4688-84b0-049424718b4e', 'Dickie', 'artist', '2022-03-15 09:50:19.032-07', '2022-03-15 09:50:19.032-07');
INSERT INTO public."Profile" ("profileId", name, type, "createdAt", "updatedAt") VALUES ('62d8e030-34af-46ea-89b1-f6b6d3fa13b5', 'Freddie', 'artist', '2022-03-15 17:20:44.21-07', '2022-03-15 17:20:44.21-07');
INSERT INTO public."Profile" ("profileId", name, type, "createdAt", "updatedAt") VALUES ('c6f37d52-5c4c-4baf-8fae-ba24ebf20f46', 'Ellis', 'artist', '2022-03-17 00:28:29.74-07', '2022-03-17 00:28:29.74-07');


--
-- TOC entry 3014 (class 0 OID 50985)
-- Dependencies: 202
-- Data for Name: WipCollections; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."WipCollections" ("wipCollectionId", "wipCollectionTitle", "profileId", "createdAt", "updatedAt") VALUES ('c16709d5-b554-422a-a178-2c2ddea48854', 'My Wip', '92f5aaa1-254e-4688-84b0-049424718b4e', '2022-03-15 09:51:39.064-07', '2022-03-15 09:51:39.064-07');
INSERT INTO public."WipCollections" ("wipCollectionId", "wipCollectionTitle", "profileId", "createdAt", "updatedAt") VALUES ('f81055f5-cf5f-4268-801f-ccd72f52e4a5', 'Mongibello', '62d8e030-34af-46ea-89b1-f6b6d3fa13b5', '2022-03-16 00:22:41.057-07', '2022-03-16 00:22:41.057-07');
INSERT INTO public."WipCollections" ("wipCollectionId", "wipCollectionTitle", "profileId", "createdAt", "updatedAt") VALUES ('acf575c0-7906-4b4d-aade-1eca076af222', 'Rome', '62d8e030-34af-46ea-89b1-f6b6d3fa13b5', '2022-03-16 00:22:47.042-07', '2022-03-16 00:22:47.042-07');
INSERT INTO public."WipCollections" ("wipCollectionId", "wipCollectionTitle", "profileId", "createdAt", "updatedAt") VALUES ('eeef9660-5853-4b81-b41c-49bad2488cca', 'Mount Etna', '62d8e030-34af-46ea-89b1-f6b6d3fa13b5', '2022-03-16 09:51:21.962-07', '2022-03-16 09:51:21.962-07');
INSERT INTO public."WipCollections" ("wipCollectionId", "wipCollectionTitle", "profileId", "createdAt", "updatedAt") VALUES ('3dbc134d-43e8-4a25-9c2d-dfff2ab2c7a2', 'Yoda', '62d8e030-34af-46ea-89b1-f6b6d3fa13b5', '2022-03-16 10:12:18.002-07', '2022-03-16 10:12:18.002-07');
INSERT INTO public."WipCollections" ("wipCollectionId", "wipCollectionTitle", "profileId", "createdAt", "updatedAt") VALUES ('00749733-3ad4-48fe-aed6-06908585af4c', 'Mount Etna', '62d8e030-34af-46ea-89b1-f6b6d3fa13b5', '2022-03-16 10:22:36.398-07', '2022-03-16 10:22:36.398-07');
INSERT INTO public."WipCollections" ("wipCollectionId", "wipCollectionTitle", "profileId", "createdAt", "updatedAt") VALUES ('c6bf1e59-17f3-48b2-90ce-272256bea0b0', 'Florence', '62d8e030-34af-46ea-89b1-f6b6d3fa13b5', '2022-03-16 10:24:58.45-07', '2022-03-16 10:24:58.45-07');
INSERT INTO public."WipCollections" ("wipCollectionId", "wipCollectionTitle", "profileId", "createdAt", "updatedAt") VALUES ('5f6762d1-8e9d-4d8c-828e-f57b743481cc', 'Bergamo', '62d8e030-34af-46ea-89b1-f6b6d3fa13b5', '2022-03-16 12:19:57.344-07', '2022-03-16 12:19:57.344-07');
INSERT INTO public."WipCollections" ("wipCollectionId", "wipCollectionTitle", "profileId", "createdAt", "updatedAt") VALUES ('92284f46-6416-474f-a9f8-ee0713f89dfb', 'MyWipCollection', '62d8e030-34af-46ea-89b1-f6b6d3fa13b5', '2022-03-16 13:09:24.651-07', '2022-03-16 13:09:24.651-07');
INSERT INTO public."WipCollections" ("wipCollectionId", "wipCollectionTitle", "profileId", "createdAt", "updatedAt") VALUES ('85c7f2ba-daa8-4e69-9d26-ea9546b227a6', 'Palermo', '62d8e030-34af-46ea-89b1-f6b6d3fa13b5', '2022-03-16 15:19:46.574-07', '2022-03-16 15:19:46.574-07');
INSERT INTO public."WipCollections" ("wipCollectionId", "wipCollectionTitle", "profileId", "createdAt", "updatedAt") VALUES ('b0ebc695-eff7-4b16-8d3e-b59db58721c7', 'Palermo', '62d8e030-34af-46ea-89b1-f6b6d3fa13b5', '2022-03-16 15:26:01.563-07', '2022-03-16 15:26:01.563-07');


--
-- TOC entry 3015 (class 0 OID 50995)
-- Dependencies: 203
-- Data for Name: Wips; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Wips" ("wipId", "wipTitle", "wipImage", "uploadDate", "wipCollectionId", "createdAt", "updatedAt") VALUES ('c968fbee-6330-458f-aaf4-0292c4526185', 'My Wip', 'myImage', '1647363195437', 'c16709d5-b554-422a-a178-2c2ddea48854', '2022-03-15 09:53:15.437-07', '2022-03-15 09:53:15.437-07');
INSERT INTO public."Wips" ("wipId", "wipTitle", "wipImage", "uploadDate", "wipCollectionId", "createdAt", "updatedAt") VALUES ('0f921626-b652-462a-a67f-a88e024fafda', 'My Second Sub Wip!!!!', 'My Second Sub Wip Image!!!!', '1647376661190', 'a2a50e5c-0203-4aa3-b295-2346927775f6', '2022-03-15 13:37:41.19-07', '2022-03-15 13:37:41.19-07');
INSERT INTO public."Wips" ("wipId", "wipTitle", "wipImage", "uploadDate", "wipCollectionId", "createdAt", "updatedAt") VALUES ('548985a7-8c38-4654-ad2d-49c65fd2364f', 'My First Sub Wip!!!!', 'My First Sub Wip Image!!!!', '1647376634669', 'a2a50e5c-0203-4aa3-b295-2346927775f6', '2022-03-15 13:37:14.67-07', '2022-03-15 13:37:14.67-07');
INSERT INTO public."Wips" ("wipId", "wipTitle", "wipImage", "uploadDate", "wipCollectionId", "createdAt", "updatedAt") VALUES ('8444d566-12b6-4b8d-8cdc-4cc06862dea5', 'Mount Etna', 'blob:http://localhost:3000/8f1015dc-6fe7-4b78-a2cc-1e73476bdad4', '1647469578489', 'b0ebc695-eff7-4b16-8d3e-b59db58721c7', '2022-03-16 15:26:18.489-07', '2022-03-16 15:26:18.489-07');


--
-- TOC entry 2877 (class 2606 OID 51033)
-- Name: Followers Followers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Followers"
    ADD CONSTRAINT "Followers_pkey" PRIMARY KEY ("followId");


--
-- TOC entry 2871 (class 2606 OID 50979)
-- Name: Login Login_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Login"
    ADD CONSTRAINT "Login_pkey" PRIMARY KEY ("loginId");


--
-- TOC entry 2869 (class 2606 OID 50971)
-- Name: Profile Profile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("profileId");


--
-- TOC entry 2873 (class 2606 OID 50989)
-- Name: WipCollections WipCollections_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WipCollections"
    ADD CONSTRAINT "WipCollections_pkey" PRIMARY KEY ("wipCollectionId");


--
-- TOC entry 2875 (class 2606 OID 51003)
-- Name: Wips Wips_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Wips"
    ADD CONSTRAINT "Wips_pkey" PRIMARY KEY ("wipId");


--
-- TOC entry 2881 (class 2606 OID 51039)
-- Name: Followers Followers_followerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Followers"
    ADD CONSTRAINT "Followers_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES public."Profile"("profileId") ON UPDATE CASCADE;


--
-- TOC entry 2880 (class 2606 OID 51034)
-- Name: Followers Followers_profileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Followers"
    ADD CONSTRAINT "Followers_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES public."Profile"("profileId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2878 (class 2606 OID 50980)
-- Name: Login Login_profileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Login"
    ADD CONSTRAINT "Login_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES public."Profile"("profileId") ON UPDATE CASCADE;


--
-- TOC entry 2879 (class 2606 OID 50990)
-- Name: WipCollections WipCollections_profileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WipCollections"
    ADD CONSTRAINT "WipCollections_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES public."Profile"("profileId") ON UPDATE CASCADE;


-- Completed on 2022-05-21 21:51:07

--
-- PostgreSQL database dump complete
--

