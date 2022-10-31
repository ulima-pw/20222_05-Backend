--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

-- Started on 2022-10-31 13:18:57

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
-- TOC entry 209 (class 1259 OID 16396)
-- Name: carrera; Type: TABLE; Schema: public; Owner: evaluaciones
--

CREATE TABLE public.carrera (
    id uuid NOT NULL,
    nombre character varying(200)
);


ALTER TABLE public.carrera OWNER TO evaluaciones;

--
-- TOC entry 212 (class 1259 OID 16419)
-- Name: ciclo; Type: TABLE; Schema: public; Owner: evaluaciones
--

CREATE TABLE public.ciclo (
    id uuid NOT NULL,
    nombre character varying(6) NOT NULL
);


ALTER TABLE public.ciclo OWNER TO evaluaciones;

--
-- TOC entry 210 (class 1259 OID 16401)
-- Name: curso; Type: TABLE; Schema: public; Owner: evaluaciones
--

CREATE TABLE public.curso (
    id uuid NOT NULL,
    nombre character varying(150) NOT NULL,
    carrera_id uuid
);


ALTER TABLE public.curso OWNER TO evaluaciones;

--
-- TOC entry 211 (class 1259 OID 16411)
-- Name: evaluacion; Type: TABLE; Schema: public; Owner: evaluaciones
--

CREATE TABLE public.evaluacion (
    id uuid NOT NULL,
    nombre character varying(200) NOT NULL,
    fecha_registro timestamp without time zone,
    curso_id uuid NOT NULL,
    ciclo_id uuid NOT NULL
);


ALTER TABLE public.evaluacion OWNER TO evaluaciones;

--
-- TOC entry 3176 (class 2606 OID 16400)
-- Name: carrera carrera_pkey; Type: CONSTRAINT; Schema: public; Owner: evaluaciones
--

ALTER TABLE ONLY public.carrera
    ADD CONSTRAINT carrera_pkey PRIMARY KEY (id);


--
-- TOC entry 3182 (class 2606 OID 16423)
-- Name: ciclo ciclo_pkey; Type: CONSTRAINT; Schema: public; Owner: evaluaciones
--

ALTER TABLE ONLY public.ciclo
    ADD CONSTRAINT ciclo_pkey PRIMARY KEY (id);


--
-- TOC entry 3178 (class 2606 OID 16405)
-- Name: curso curso_pkey; Type: CONSTRAINT; Schema: public; Owner: evaluaciones
--

ALTER TABLE ONLY public.curso
    ADD CONSTRAINT curso_pkey PRIMARY KEY (id);


--
-- TOC entry 3180 (class 2606 OID 16425)
-- Name: evaluacion evaluacion_pkey; Type: CONSTRAINT; Schema: public; Owner: evaluaciones
--

ALTER TABLE ONLY public.evaluacion
    ADD CONSTRAINT evaluacion_pkey PRIMARY KEY (id);


--
-- TOC entry 3183 (class 2606 OID 16406)
-- Name: curso fk_curso_carrera; Type: FK CONSTRAINT; Schema: public; Owner: evaluaciones
--

ALTER TABLE ONLY public.curso
    ADD CONSTRAINT fk_curso_carrera FOREIGN KEY (carrera_id) REFERENCES public.carrera(id);


--
-- TOC entry 3185 (class 2606 OID 16426)
-- Name: evaluacion fk_evaluacion_ciclo; Type: FK CONSTRAINT; Schema: public; Owner: evaluaciones
--

ALTER TABLE ONLY public.evaluacion
    ADD CONSTRAINT fk_evaluacion_ciclo FOREIGN KEY (ciclo_id) REFERENCES public.ciclo(id) NOT VALID;


--
-- TOC entry 3184 (class 2606 OID 16414)
-- Name: evaluacion fk_evaluacion_curso; Type: FK CONSTRAINT; Schema: public; Owner: evaluaciones
--

ALTER TABLE ONLY public.evaluacion
    ADD CONSTRAINT fk_evaluacion_curso FOREIGN KEY (curso_id) REFERENCES public.curso(id);


-- Completed on 2022-10-31 13:18:58

--
-- PostgreSQL database dump complete
--

