--
-- PostgreSQL database dump
--



-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-06-12 16:35:01

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 926 (class 1247 OID 33862)
-- Name: enum_publicaciones_licencia; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_publicaciones_licencia AS ENUM (
    'copyright',
    'sin-copyright'
);


ALTER TYPE public.enum_publicaciones_licencia OWNER TO neondb_owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 239 (class 1259 OID 33668)
-- Name: coleccion_publicaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coleccion_publicaciones (
    id integer NOT NULL,
    "coleccionId" integer NOT NULL,
    "publicacionId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.coleccion_publicaciones OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 33667)
-- Name: coleccion_publicaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.coleccion_publicaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.coleccion_publicaciones_id_seq OWNER TO postgres;

--
-- TOC entry 5194 (class 0 OID 0)
-- Dependencies: 238
-- Name: coleccion_publicaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.coleccion_publicaciones_id_seq OWNED BY public.coleccion_publicaciones.id;


--
-- TOC entry 237 (class 1259 OID 33652)
-- Name: colecciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.colecciones (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "usuarioId" integer
);


ALTER TABLE public.colecciones OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 33651)
-- Name: colecciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.colecciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.colecciones_id_seq OWNER TO postgres;

--
-- TOC entry 5195 (class 0 OID 0)
-- Dependencies: 236
-- Name: colecciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.colecciones_id_seq OWNED BY public.colecciones.id;


--
-- TOC entry 227 (class 1259 OID 33539)
-- Name: comentarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comentarios (
    id integer NOT NULL,
    texto text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "usuarioId" integer,
    "publicacionId" integer
);


ALTER TABLE public.comentarios OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 33538)
-- Name: comentarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comentarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comentarios_id_seq OWNER TO postgres;

--
-- TOC entry 5196 (class 0 OID 0)
-- Dependencies: 226
-- Name: comentarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comentarios_id_seq OWNED BY public.comentarios.id;


--
-- TOC entry 243 (class 1259 OID 33714)
-- Name: denuncias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.denuncias (
    id integer NOT NULL,
    motivo character varying(255) NOT NULL,
    descripcion text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "usuarioId" integer,
    "publicacionId" integer
);


ALTER TABLE public.denuncias OWNER TO postgres;

--
-- TOC entry 248 (class 1259 OID 33836)
-- Name: denuncias_comentarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.denuncias_comentarios (
    id integer NOT NULL,
    motivo character varying(255) NOT NULL,
    descripcion text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "usuarioId" integer,
    "comentarioId" integer
);


ALTER TABLE public.denuncias_comentarios OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 33835)
-- Name: denuncias_comentarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.denuncias_comentarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.denuncias_comentarios_id_seq OWNER TO postgres;

--
-- TOC entry 5197 (class 0 OID 0)
-- Dependencies: 247
-- Name: denuncias_comentarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.denuncias_comentarios_id_seq OWNED BY public.denuncias_comentarios.id;


--
-- TOC entry 242 (class 1259 OID 33713)
-- Name: denuncias_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.denuncias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.denuncias_id_seq OWNER TO postgres;

--
-- TOC entry 5198 (class 0 OID 0)
-- Dependencies: 242
-- Name: denuncias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.denuncias_id_seq OWNED BY public.denuncias.id;


--
-- TOC entry 245 (class 1259 OID 33804)
-- Name: etiquetas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.etiquetas (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.etiquetas OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 33803)
-- Name: etiquetas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.etiquetas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.etiquetas_id_seq OWNER TO postgres;

--
-- TOC entry 5199 (class 0 OID 0)
-- Dependencies: 244
-- Name: etiquetas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.etiquetas_id_seq OWNED BY public.etiquetas.id;


--
-- TOC entry 235 (class 1259 OID 33630)
-- Name: favoritos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favoritos (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "usuarioId" integer,
    "publicacionId" integer
);


ALTER TABLE public.favoritos OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 33629)
-- Name: favoritos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.favoritos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.favoritos_id_seq OWNER TO postgres;

--
-- TOC entry 5200 (class 0 OID 0)
-- Dependencies: 234
-- Name: favoritos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.favoritos_id_seq OWNED BY public.favoritos.id;


--
-- TOC entry 233 (class 1259 OID 33610)
-- Name: intereses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.intereses (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "usuarioId" integer,
    "publicacionId" integer
);


ALTER TABLE public.intereses OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 33609)
-- Name: intereses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.intereses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.intereses_id_seq OWNER TO postgres;

--
-- TOC entry 5201 (class 0 OID 0)
-- Dependencies: 232
-- Name: intereses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.intereses_id_seq OWNED BY public.intereses.id;


--
-- TOC entry 241 (class 1259 OID 33692)
-- Name: notificaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notificaciones (
    id integer NOT NULL,
    tipo character varying(255) NOT NULL,
    leida boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "usuarioDestinoId" integer,
    "usuarioEmisorId" integer,
    "publicacionId" integer,
    "comentarioId" integer
);


ALTER TABLE public.notificaciones OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 33691)
-- Name: notificaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notificaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notificaciones_id_seq OWNER TO postgres;

--
-- TOC entry 5202 (class 0 OID 0)
-- Dependencies: 240
-- Name: notificaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notificaciones_id_seq OWNED BY public.notificaciones.id;


--
-- TOC entry 246 (class 1259 OID 33816)
-- Name: publicacion_etiquetas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.publicacion_etiquetas (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "etiquetaId" integer NOT NULL,
    "publicacionId" integer NOT NULL
);


ALTER TABLE public.publicacion_etiquetas OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 33519)
-- Name: publicaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.publicaciones (
    id integer NOT NULL,
    titulo character varying(255) NOT NULL,
    descripcion text NOT NULL,
    imagen character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "usuarioId" integer,
    "comentariosCerrados" boolean DEFAULT false,
    "textoMarcaAgua" character varying(255),
    licencia character varying(30) DEFAULT 'copyright'::character varying,
    "marcaAgua" boolean DEFAULT false
);


ALTER TABLE public.publicaciones OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 33518)
-- Name: publicaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.publicaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.publicaciones_id_seq OWNER TO postgres;

--
-- TOC entry 5203 (class 0 OID 0)
-- Dependencies: 224
-- Name: publicaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.publicaciones_id_seq OWNED BY public.publicaciones.id;


--
-- TOC entry 231 (class 1259 OID 33588)
-- Name: seguimientos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.seguimientos (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "seguidorId" integer,
    "seguidoId" integer
);


ALTER TABLE public.seguimientos OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 33587)
-- Name: seguimientos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seguimientos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.seguimientos_id_seq OWNER TO postgres;

--
-- TOC entry 5204 (class 0 OID 0)
-- Dependencies: 230
-- Name: seguimientos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.seguimientos_id_seq OWNED BY public.seguimientos.id;


--
-- TOC entry 221 (class 1259 OID 16997)
-- Name: session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 33500)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    rol character varying(255) DEFAULT 'usuario'::character varying,
    estado boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 33499)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 5205 (class 0 OID 0)
-- Dependencies: 222
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 229 (class 1259 OID 33562)
-- Name: valoraciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.valoraciones (
    id integer NOT NULL,
    puntaje integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "usuarioId" integer,
    "publicacionId" integer,
    "publicidadId" integer
);


ALTER TABLE public.valoraciones OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 33561)
-- Name: valoraciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.valoraciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.valoraciones_id_seq OWNER TO postgres;

--
-- TOC entry 5206 (class 0 OID 0)
-- Dependencies: 228
-- Name: valoraciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.valoraciones_id_seq OWNED BY public.valoraciones.id;


--
-- TOC entry 4942 (class 2604 OID 33671)
-- Name: coleccion_publicaciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coleccion_publicaciones ALTER COLUMN id SET DEFAULT nextval('public.coleccion_publicaciones_id_seq'::regclass);


--
-- TOC entry 4941 (class 2604 OID 33655)
-- Name: colecciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colecciones ALTER COLUMN id SET DEFAULT nextval('public.colecciones_id_seq'::regclass);


--
-- TOC entry 4936 (class 2604 OID 33542)
-- Name: comentarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentarios ALTER COLUMN id SET DEFAULT nextval('public.comentarios_id_seq'::regclass);


--
-- TOC entry 4945 (class 2604 OID 33717)
-- Name: denuncias id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.denuncias ALTER COLUMN id SET DEFAULT nextval('public.denuncias_id_seq'::regclass);


--
-- TOC entry 4947 (class 2604 OID 33839)
-- Name: denuncias_comentarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.denuncias_comentarios ALTER COLUMN id SET DEFAULT nextval('public.denuncias_comentarios_id_seq'::regclass);


--
-- TOC entry 4946 (class 2604 OID 33807)
-- Name: etiquetas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etiquetas ALTER COLUMN id SET DEFAULT nextval('public.etiquetas_id_seq'::regclass);


--
-- TOC entry 4940 (class 2604 OID 33633)
-- Name: favoritos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos ALTER COLUMN id SET DEFAULT nextval('public.favoritos_id_seq'::regclass);


--
-- TOC entry 4939 (class 2604 OID 33613)
-- Name: intereses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.intereses ALTER COLUMN id SET DEFAULT nextval('public.intereses_id_seq'::regclass);


--
-- TOC entry 4943 (class 2604 OID 33695)
-- Name: notificaciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones ALTER COLUMN id SET DEFAULT nextval('public.notificaciones_id_seq'::regclass);


--
-- TOC entry 4932 (class 2604 OID 33522)
-- Name: publicaciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publicaciones ALTER COLUMN id SET DEFAULT nextval('public.publicaciones_id_seq'::regclass);


--
-- TOC entry 4938 (class 2604 OID 33591)
-- Name: seguimientos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seguimientos ALTER COLUMN id SET DEFAULT nextval('public.seguimientos_id_seq'::regclass);


--
-- TOC entry 4929 (class 2604 OID 33503)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 4937 (class 2604 OID 33565)
-- Name: valoraciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.valoraciones ALTER COLUMN id SET DEFAULT nextval('public.valoraciones_id_seq'::regclass);


--
-- TOC entry 5179 (class 0 OID 33668)
-- Dependencies: 239
-- Data for Name: coleccion_publicaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.coleccion_publicaciones (id, "coleccionId", "publicacionId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5177 (class 0 OID 33652)
-- Dependencies: 237
-- Data for Name: colecciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.colecciones (id, nombre, "createdAt", "updatedAt", "usuarioId") FROM stdin;
1	prueba	2026-06-12 05:55:26.226-03	2026-06-12 05:55:26.226-03	1
2	prueba	2026-06-12 16:15:02.686-03	2026-06-12 16:15:02.686-03	1
\.


--
-- TOC entry 5167 (class 0 OID 33539)
-- Dependencies: 227
-- Data for Name: comentarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comentarios (id, texto, "createdAt", "updatedAt", "usuarioId", "publicacionId") FROM stdin;
5	lindo lobo	2026-06-10 19:19:31.164-03	2026-06-10 19:19:31.164-03	2	\N
7	linda fiesta	2026-06-12 02:34:09.405-03	2026-06-12 02:34:09.405-03	1	\N
9	hola	2026-06-12 12:58:37.593-03	2026-06-12 12:58:37.593-03	1	\N
6	bonito lugar	2026-06-12 02:24:05.581-03	2026-06-12 02:24:05.581-03	1	\N
8	que buen desayuno	2026-06-12 06:30:45.376-03	2026-06-12 06:30:45.376-03	1	\N
\.


--
-- TOC entry 5183 (class 0 OID 33714)
-- Dependencies: 243
-- Data for Name: denuncias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.denuncias (id, motivo, descripcion, "createdAt", "updatedAt", "usuarioId", "publicacionId") FROM stdin;
1	Spam	prueba	2026-06-10 19:12:04.072-03	2026-06-10 19:12:04.072-03	2	\N
4	Copyright	prueba	2026-06-12 12:59:31.392-03	2026-06-12 12:59:31.392-03	2	\N
5	Copyright	prueba	2026-06-12 12:59:54.145-03	2026-06-12 12:59:54.145-03	3	\N
6	Copyright	prueba	2026-06-12 12:59:54.148-03	2026-06-12 12:59:54.148-03	3	\N
8	Copyright	prueba	2026-06-12 13:02:15.669-03	2026-06-12 13:02:15.669-03	6	\N
7	Copyright	prueba	2026-06-12 13:01:59.132-03	2026-06-12 13:01:59.132-03	6	\N
3	Spam	prueba	2026-06-12 05:15:12.568-03	2026-06-12 05:15:12.568-03	1	\N
2	Spam	prueba	2026-06-12 04:49:37.784-03	2026-06-12 04:49:37.784-03	3	\N
\.


--
-- TOC entry 5188 (class 0 OID 33836)
-- Dependencies: 248
-- Data for Name: denuncias_comentarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.denuncias_comentarios (id, motivo, descripcion, "createdAt", "updatedAt", "usuarioId", "comentarioId") FROM stdin;
2	Spam	otra vez porque si	2026-06-10 18:01:48.695-03	2026-06-10 18:01:48.695-03	2	\N
1	Spam	solo porque si	2026-06-10 15:26:01.211-03	2026-06-10 15:26:01.211-03	1	\N
3	Spam	prueba	2026-06-10 19:12:28.778-03	2026-06-10 19:12:28.778-03	2	\N
4	Spam	prueba 2	2026-06-10 19:12:40.606-03	2026-06-10 19:12:40.606-03	2	\N
5	Spam	prueba 3	2026-06-10 19:20:06.391-03	2026-06-10 19:20:06.391-03	1	5
6	Spam	prueba	2026-06-12 04:42:48.739-03	2026-06-12 04:42:48.739-03	3	6
7	Contenido ofensivo	me dio hambre	2026-06-12 06:31:40.583-03	2026-06-12 06:31:40.583-03	3	8
8	Spam	seaasdas	2026-06-12 06:33:13.015-03	2026-06-12 06:33:13.015-03	2	8
\.


--
-- TOC entry 5185 (class 0 OID 33804)
-- Dependencies: 245
-- Data for Name: etiquetas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.etiquetas (id, nombre, "createdAt", "updatedAt") FROM stdin;
1	viaje	2026-06-09 17:41:11.195-03	2026-06-09 17:41:11.195-03
2	animal	2026-06-09 20:10:56.189-03	2026-06-09 20:10:56.189-03
3	lugar	2026-06-09 20:14:02.916-03	2026-06-09 20:14:02.916-03
4	imagen1 imagen2	2026-06-10 20:31:22.131-03	2026-06-10 20:31:22.131-03
5	animal lugar	2026-06-10 21:08:32.429-03	2026-06-10 21:08:32.429-03
6	naturaleza	2026-06-11 16:34:22.555-03	2026-06-11 16:34:22.555-03
7	comida	2026-06-11 20:46:24.165-03	2026-06-11 20:46:24.165-03
8	laburando	2026-06-11 20:47:22.4-03	2026-06-11 20:47:22.4-03
9	vehiculos	2026-06-11 20:49:37.08-03	2026-06-11 20:49:37.08-03
10	animales	2026-06-11 20:56:49.438-03	2026-06-11 20:56:49.438-03
11	salida	2026-06-11 21:12:25.407-03	2026-06-11 21:12:25.407-03
12	de nuevo	2026-06-11 21:13:09.77-03	2026-06-11 21:13:09.77-03
13	prueba	2026-06-12 02:13:55.819-03	2026-06-12 02:13:55.819-03
14	viaje montaña	2026-06-12 06:17:07.441-03	2026-06-12 06:17:07.441-03
15	denuncias	2026-06-12 12:57:41.602-03	2026-06-12 12:57:41.602-03
\.


--
-- TOC entry 5175 (class 0 OID 33630)
-- Dependencies: 235
-- Data for Name: favoritos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favoritos (id, "createdAt", "updatedAt", "usuarioId", "publicacionId") FROM stdin;
\.


--
-- TOC entry 5173 (class 0 OID 33610)
-- Dependencies: 233
-- Data for Name: intereses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.intereses (id, "createdAt", "updatedAt", "usuarioId", "publicacionId") FROM stdin;
2	2026-06-12 15:21:15.462-03	2026-06-12 15:21:15.462-03	6	\N
1	2026-06-12 05:55:51.842-03	2026-06-12 05:55:51.842-03	1	\N
\.


--
-- TOC entry 5181 (class 0 OID 33692)
-- Dependencies: 241
-- Data for Name: notificaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notificaciones (id, tipo, leida, "createdAt", "updatedAt", "usuarioDestinoId", "usuarioEmisorId", "publicacionId", "comentarioId") FROM stdin;
1	seguimiento	f	2026-06-09 20:12:41.855-03	2026-06-09 20:12:41.855-03	1	3	\N	\N
2	seguimiento	f	2026-06-09 20:12:43.754-03	2026-06-09 20:12:43.754-03	2	3	\N	\N
3	valoracion	f	2026-06-09 20:12:52.845-03	2026-06-09 20:12:52.845-03	2	3	\N	\N
4	valoracion	f	2026-06-09 20:13:05.817-03	2026-06-09 20:13:05.817-03	1	3	\N	\N
5	seguimiento	f	2026-06-09 20:14:49.761-03	2026-06-09 20:14:49.761-03	2	1	\N	\N
6	seguimiento	f	2026-06-09 20:14:52.016-03	2026-06-09 20:14:52.016-03	3	1	\N	\N
7	valoracion	f	2026-06-09 20:15:00.974-03	2026-06-09 20:15:00.974-03	3	1	\N	\N
8	valoracion	f	2026-06-09 20:15:08.759-03	2026-06-09 20:15:08.759-03	2	1	\N	\N
9	valoracion	f	2026-06-09 20:15:28.413-03	2026-06-09 20:15:28.413-03	3	1	\N	\N
10	seguimiento	f	2026-06-09 20:15:56.408-03	2026-06-09 20:15:56.408-03	1	2	\N	\N
11	seguimiento	f	2026-06-09 20:15:58.126-03	2026-06-09 20:15:58.126-03	3	2	\N	\N
12	valoracion	f	2026-06-09 20:16:04.857-03	2026-06-09 20:16:04.857-03	3	2	\N	\N
13	valoracion	f	2026-06-09 20:16:15.608-03	2026-06-09 20:16:15.608-03	3	2	\N	\N
14	valoracion	f	2026-06-09 20:16:31.855-03	2026-06-09 20:16:31.855-03	1	2	\N	\N
15	comentario	f	2026-06-10 15:25:09.327-03	2026-06-10 15:25:09.327-03	1	2	\N	\N
16	comentario	f	2026-06-10 18:00:45.836-03	2026-06-10 18:00:45.836-03	2	1	\N	\N
17	comentario	f	2026-06-10 19:19:31.179-03	2026-06-10 19:19:31.179-03	3	2	\N	\N
18	comentario	f	2026-06-12 02:24:05.602-03	2026-06-12 02:24:05.602-03	3	1	\N	\N
19	comentario	f	2026-06-12 02:34:09.423-03	2026-06-12 02:34:09.423-03	3	1	\N	\N
20	interes	f	2026-06-12 05:55:51.853-03	2026-06-12 05:55:51.853-03	2	1	\N	\N
21	comentario	f	2026-06-12 06:30:45.397-03	2026-06-12 06:30:45.397-03	2	1	\N	\N
22	comentario	f	2026-06-12 12:58:37.612-03	2026-06-12 12:58:37.612-03	3	1	\N	\N
28	interes	t	2026-06-12 15:21:15.482-03	2026-06-12 16:15:25.3-03	1	6	\N	\N
\.


--
-- TOC entry 5186 (class 0 OID 33816)
-- Dependencies: 246
-- Data for Name: publicacion_etiquetas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.publicacion_etiquetas ("createdAt", "updatedAt", "etiquetaId", "publicacionId") FROM stdin;
\.


--
-- TOC entry 5165 (class 0 OID 33519)
-- Dependencies: 225
-- Data for Name: publicaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.publicaciones (id, titulo, descripcion, imagen, "createdAt", "updatedAt", "usuarioId", "comentariosCerrados", "textoMarcaAgua", licencia, "marcaAgua") FROM stdin;
\.


--
-- TOC entry 5171 (class 0 OID 33588)
-- Dependencies: 231
-- Data for Name: seguimientos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.seguimientos (id, "createdAt", "updatedAt", "seguidorId", "seguidoId") FROM stdin;
1	2026-06-09 20:12:41.838-03	2026-06-09 20:12:41.838-03	3	1
2	2026-06-09 20:12:43.75-03	2026-06-09 20:12:43.75-03	3	2
3	2026-06-09 20:14:49.755-03	2026-06-09 20:14:49.755-03	1	2
4	2026-06-09 20:14:52.012-03	2026-06-09 20:14:52.012-03	1	3
5	2026-06-09 20:15:56.401-03	2026-06-09 20:15:56.401-03	2	1
6	2026-06-09 20:15:58.123-03	2026-06-09 20:15:58.123-03	2	3
\.


--
-- TOC entry 5161 (class 0 OID 16997)
-- Dependencies: 221
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.session (sid, sess, expire) FROM stdin;
7Y0M4zlcsVXOt1FJk0Xx1Bfht2n7JNUV	{"cookie":{"originalMaxAge":86400000,"expires":"2026-06-13T16:02:25.144Z","httpOnly":true,"path":"/"},"usuario":{"id":4,"nombre":"Administrador","rol":"admin"}}	2026-06-13 14:39:35
RRQ6zavh3Y58HPqZZIUKeth6gwJOiIhk	{"cookie":{"originalMaxAge":86400000,"expires":"2026-06-13T19:14:44.808Z","httpOnly":true,"path":"/"},"usuario":{"id":1,"nombre":"Emmanuel","rol":"usuario"}}	2026-06-13 16:15:26
\.


--
-- TOC entry 5163 (class 0 OID 33500)
-- Dependencies: 223
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, email, password, rol, estado, "createdAt", "updatedAt") FROM stdin;
2	martin	Martin@gmail.com	$2b$10$3/VAVAoJjDch3ml5V5NEguZBFt8emGghgHN7.ZglcjhURuQT7fZoq	usuario	t	2026-06-09 20:09:20.038-03	2026-06-09 20:09:20.038-03
3	mauricio	mauricio@gmail.com	$2b$10$NE0YTTyKNljGswOGuEUN6uCvm4TwYmqRTLNPBxMz7rTF.Gr6nz7Be	usuario	t	2026-06-09 20:11:37.964-03	2026-06-09 20:11:37.964-03
4	Administrador	admin@fotaza.com	$2b$10$.GQf/juVTcfHckNrfWyXzed5D5fz1ll6f/.DHAu92jTHJXMRkNzyO	admin	t	2026-06-11 23:35:31.227-03	2026-06-11 23:35:31.227-03
5	Mauricio	mauricio@fotaza.com	$2b$10$.GQf/juVTcfHckNrfWyXzed5D5fz1ll6f/.DHAu92jTHJXMRkNzyO	usuario	t	2026-06-11 23:35:31.727-03	2026-06-11 23:35:31.727-03
6	Emmanuel	emmanuel@fotaza.com	$2b$10$.GQf/juVTcfHckNrfWyXzed5D5fz1ll6f/.DHAu92jTHJXMRkNzyO	usuario	t	2026-06-11 23:35:31.734-03	2026-06-11 23:35:31.734-03
1	Emmanuel	emma@gmail.com	$2b$10$48wyc8dsT7uZsy2hGluVbOx7Pla6SDlHU9raHoMydScZ/7M./V6E2	usuario	t	2026-06-09 00:31:35.7-03	2026-06-12 13:17:30.377-03
\.


--
-- TOC entry 5169 (class 0 OID 33562)
-- Dependencies: 229
-- Data for Name: valoraciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.valoraciones (id, puntaje, "createdAt", "updatedAt", "usuarioId", "publicacionId", "publicidadId") FROM stdin;
3	4	2026-06-09 20:15:00.969-03	2026-06-09 20:15:00.969-03	1	\N	\N
6	4	2026-06-09 20:16:04.854-03	2026-06-09 20:16:04.854-03	2	\N	\N
5	4	2026-06-09 20:15:28.406-03	2026-06-09 20:15:28.406-03	1	\N	\N
7	2	2026-06-09 20:16:15.602-03	2026-06-09 20:16:15.602-03	2	\N	\N
2	3	2026-06-09 20:13:05.809-03	2026-06-09 20:13:05.809-03	3	\N	\N
8	2	2026-06-09 20:16:31.847-03	2026-06-09 20:16:31.847-03	2	\N	\N
1	5	2026-06-09 20:12:52.841-03	2026-06-09 20:12:52.841-03	3	\N	\N
4	5	2026-06-09 20:15:08.757-03	2026-06-09 20:15:08.757-03	1	\N	\N
\.


--
-- TOC entry 5207 (class 0 OID 0)
-- Dependencies: 238
-- Name: coleccion_publicaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.coleccion_publicaciones_id_seq', 2, true);


--
-- TOC entry 5208 (class 0 OID 0)
-- Dependencies: 236
-- Name: colecciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.colecciones_id_seq', 2, true);


--
-- TOC entry 5209 (class 0 OID 0)
-- Dependencies: 226
-- Name: comentarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comentarios_id_seq', 9, true);


--
-- TOC entry 5210 (class 0 OID 0)
-- Dependencies: 247
-- Name: denuncias_comentarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.denuncias_comentarios_id_seq', 8, true);


--
-- TOC entry 5211 (class 0 OID 0)
-- Dependencies: 242
-- Name: denuncias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.denuncias_id_seq', 8, true);


--
-- TOC entry 5212 (class 0 OID 0)
-- Dependencies: 244
-- Name: etiquetas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.etiquetas_id_seq', 15, true);


--
-- TOC entry 5213 (class 0 OID 0)
-- Dependencies: 234
-- Name: favoritos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favoritos_id_seq', 2, true);


--
-- TOC entry 5214 (class 0 OID 0)
-- Dependencies: 232
-- Name: intereses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.intereses_id_seq', 2, true);


--
-- TOC entry 5215 (class 0 OID 0)
-- Dependencies: 240
-- Name: notificaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notificaciones_id_seq', 28, true);


--
-- TOC entry 5216 (class 0 OID 0)
-- Dependencies: 224
-- Name: publicaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.publicaciones_id_seq', 36, true);


--
-- TOC entry 5217 (class 0 OID 0)
-- Dependencies: 230
-- Name: seguimientos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seguimientos_id_seq', 6, true);


--
-- TOC entry 5218 (class 0 OID 0)
-- Dependencies: 222
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 6, true);


--
-- TOC entry 5219 (class 0 OID 0)
-- Dependencies: 228
-- Name: valoraciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.valoraciones_id_seq', 8, true);


--
-- TOC entry 4974 (class 2606 OID 33680)
-- Name: coleccion_publicaciones coleccion_publicaciones_coleccionId_publicacionId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coleccion_publicaciones
    ADD CONSTRAINT "coleccion_publicaciones_coleccionId_publicacionId_key" UNIQUE ("coleccionId", "publicacionId");


--
-- TOC entry 4976 (class 2606 OID 33678)
-- Name: coleccion_publicaciones coleccion_publicaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coleccion_publicaciones
    ADD CONSTRAINT coleccion_publicaciones_pkey PRIMARY KEY (id);


--
-- TOC entry 4972 (class 2606 OID 33661)
-- Name: colecciones colecciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colecciones
    ADD CONSTRAINT colecciones_pkey PRIMARY KEY (id);


--
-- TOC entry 4958 (class 2606 OID 33550)
-- Name: comentarios comentarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4988 (class 2606 OID 33848)
-- Name: denuncias_comentarios denuncias_comentarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.denuncias_comentarios
    ADD CONSTRAINT denuncias_comentarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4980 (class 2606 OID 33726)
-- Name: denuncias denuncias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.denuncias
    ADD CONSTRAINT denuncias_pkey PRIMARY KEY (id);


--
-- TOC entry 4982 (class 2606 OID 33815)
-- Name: etiquetas etiquetas_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etiquetas
    ADD CONSTRAINT etiquetas_nombre_key UNIQUE (nombre);


--
-- TOC entry 4984 (class 2606 OID 33813)
-- Name: etiquetas etiquetas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etiquetas
    ADD CONSTRAINT etiquetas_pkey PRIMARY KEY (id);


--
-- TOC entry 4968 (class 2606 OID 33638)
-- Name: favoritos favoritos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_pkey PRIMARY KEY (id);


--
-- TOC entry 4970 (class 2606 OID 33640)
-- Name: favoritos favoritos_usuarioId_publicacionId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT "favoritos_usuarioId_publicacionId_key" UNIQUE ("usuarioId", "publicacionId");


--
-- TOC entry 4966 (class 2606 OID 33618)
-- Name: intereses intereses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.intereses
    ADD CONSTRAINT intereses_pkey PRIMARY KEY (id);


--
-- TOC entry 4978 (class 2606 OID 33702)
-- Name: notificaciones notificaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones
    ADD CONSTRAINT notificaciones_pkey PRIMARY KEY (id);


--
-- TOC entry 4986 (class 2606 OID 33824)
-- Name: publicacion_etiquetas publicacion_etiquetas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publicacion_etiquetas
    ADD CONSTRAINT publicacion_etiquetas_pkey PRIMARY KEY ("etiquetaId", "publicacionId");


--
-- TOC entry 4956 (class 2606 OID 33532)
-- Name: publicaciones publicaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publicaciones
    ADD CONSTRAINT publicaciones_pkey PRIMARY KEY (id);


--
-- TOC entry 4962 (class 2606 OID 33596)
-- Name: seguimientos seguimientos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seguimientos
    ADD CONSTRAINT seguimientos_pkey PRIMARY KEY (id);


--
-- TOC entry 4964 (class 2606 OID 33598)
-- Name: seguimientos seguimientos_seguidorId_seguidoId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seguimientos
    ADD CONSTRAINT "seguimientos_seguidorId_seguidoId_key" UNIQUE ("seguidorId", "seguidoId");


--
-- TOC entry 4950 (class 2606 OID 17006)
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- TOC entry 4952 (class 2606 OID 33517)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4954 (class 2606 OID 33515)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4960 (class 2606 OID 33571)
-- Name: valoraciones valoraciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.valoraciones
    ADD CONSTRAINT valoraciones_pkey PRIMARY KEY (id);


--
-- TOC entry 4948 (class 1259 OID 17007)
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- TOC entry 5002 (class 2606 OID 33681)
-- Name: coleccion_publicaciones coleccion_publicaciones_coleccionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coleccion_publicaciones
    ADD CONSTRAINT "coleccion_publicaciones_coleccionId_fkey" FOREIGN KEY ("coleccionId") REFERENCES public.colecciones(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5003 (class 2606 OID 33686)
-- Name: coleccion_publicaciones coleccion_publicaciones_publicacionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coleccion_publicaciones
    ADD CONSTRAINT "coleccion_publicaciones_publicacionId_fkey" FOREIGN KEY ("publicacionId") REFERENCES public.publicaciones(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5001 (class 2606 OID 33662)
-- Name: colecciones colecciones_usuarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colecciones
    ADD CONSTRAINT "colecciones_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public.usuarios(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4990 (class 2606 OID 33556)
-- Name: comentarios comentarios_publicacionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT "comentarios_publicacionId_fkey" FOREIGN KEY ("publicacionId") REFERENCES public.publicaciones(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4991 (class 2606 OID 33551)
-- Name: comentarios comentarios_usuarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT "comentarios_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public.usuarios(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5012 (class 2606 OID 33854)
-- Name: denuncias_comentarios denuncias_comentarios_comentarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.denuncias_comentarios
    ADD CONSTRAINT "denuncias_comentarios_comentarioId_fkey" FOREIGN KEY ("comentarioId") REFERENCES public.comentarios(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5013 (class 2606 OID 33849)
-- Name: denuncias_comentarios denuncias_comentarios_usuarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.denuncias_comentarios
    ADD CONSTRAINT "denuncias_comentarios_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public.usuarios(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5008 (class 2606 OID 33732)
-- Name: denuncias denuncias_publicacionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.denuncias
    ADD CONSTRAINT "denuncias_publicacionId_fkey" FOREIGN KEY ("publicacionId") REFERENCES public.publicaciones(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5009 (class 2606 OID 33727)
-- Name: denuncias denuncias_usuarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.denuncias
    ADD CONSTRAINT "denuncias_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public.usuarios(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4999 (class 2606 OID 33646)
-- Name: favoritos favoritos_publicacionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT "favoritos_publicacionId_fkey" FOREIGN KEY ("publicacionId") REFERENCES public.publicaciones(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5000 (class 2606 OID 33641)
-- Name: favoritos favoritos_usuarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT "favoritos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public.usuarios(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4997 (class 2606 OID 33624)
-- Name: intereses intereses_publicacionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.intereses
    ADD CONSTRAINT "intereses_publicacionId_fkey" FOREIGN KEY ("publicacionId") REFERENCES public.publicaciones(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4998 (class 2606 OID 33619)
-- Name: intereses intereses_usuarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.intereses
    ADD CONSTRAINT "intereses_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public.usuarios(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5004 (class 2606 OID 33877)
-- Name: notificaciones notificaciones_comentarioid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones
    ADD CONSTRAINT notificaciones_comentarioid_fkey FOREIGN KEY ("comentarioId") REFERENCES public.publicaciones(id) ON DELETE CASCADE;


--
-- TOC entry 5005 (class 2606 OID 33872)
-- Name: notificaciones notificaciones_publicacionid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones
    ADD CONSTRAINT notificaciones_publicacionid_fkey FOREIGN KEY ("publicacionId") REFERENCES public.publicaciones(id) ON DELETE CASCADE;


--
-- TOC entry 5006 (class 2606 OID 33703)
-- Name: notificaciones notificaciones_usuarioDestinoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones
    ADD CONSTRAINT "notificaciones_usuarioDestinoId_fkey" FOREIGN KEY ("usuarioDestinoId") REFERENCES public.usuarios(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5007 (class 2606 OID 33708)
-- Name: notificaciones notificaciones_usuarioEmisorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones
    ADD CONSTRAINT "notificaciones_usuarioEmisorId_fkey" FOREIGN KEY ("usuarioEmisorId") REFERENCES public.usuarios(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5010 (class 2606 OID 33825)
-- Name: publicacion_etiquetas publicacion_etiquetas_etiquetaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publicacion_etiquetas
    ADD CONSTRAINT "publicacion_etiquetas_etiquetaId_fkey" FOREIGN KEY ("etiquetaId") REFERENCES public.etiquetas(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5011 (class 2606 OID 33830)
-- Name: publicacion_etiquetas publicacion_etiquetas_publicacionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publicacion_etiquetas
    ADD CONSTRAINT "publicacion_etiquetas_publicacionId_fkey" FOREIGN KEY ("publicacionId") REFERENCES public.publicaciones(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4989 (class 2606 OID 33533)
-- Name: publicaciones publicaciones_usuarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publicaciones
    ADD CONSTRAINT "publicaciones_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public.usuarios(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4995 (class 2606 OID 33604)
-- Name: seguimientos seguimientos_seguidoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seguimientos
    ADD CONSTRAINT "seguimientos_seguidoId_fkey" FOREIGN KEY ("seguidoId") REFERENCES public.usuarios(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4996 (class 2606 OID 33599)
-- Name: seguimientos seguimientos_seguidorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seguimientos
    ADD CONSTRAINT "seguimientos_seguidorId_fkey" FOREIGN KEY ("seguidorId") REFERENCES public.usuarios(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4992 (class 2606 OID 33577)
-- Name: valoraciones valoraciones_publicacionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.valoraciones
    ADD CONSTRAINT "valoraciones_publicacionId_fkey" FOREIGN KEY ("publicacionId") REFERENCES public.publicaciones(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4993 (class 2606 OID 33582)
-- Name: valoraciones valoraciones_publicidadId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.valoraciones
    ADD CONSTRAINT "valoraciones_publicidadId_fkey" FOREIGN KEY ("publicidadId") REFERENCES public.publicaciones(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4994 (class 2606 OID 33572)
-- Name: valoraciones valoraciones_usuarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.valoraciones
    ADD CONSTRAINT "valoraciones_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public.usuarios(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2026-06-12 16:35:01

--
-- PostgreSQL database dump complete
--



