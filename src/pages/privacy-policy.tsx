import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
import React, { useState } from "react";
import CookieConsent from "react-cookie-consent";
import { Button } from "../components/Button";
import { TextField } from "../components/Forms/TextField";
import { Heading } from "../components/Heading";

import Image from "next/image";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Tempus | Política de Privacidade</title>
      </Head>
      <div className="px-12 md:px-24 lg:px-48 py-24">
        <div className="block mb-4">
          <Image src="/logo.svg" height={75} width={240} />
        </div>
        <Heading size="h2">Política de Privacidade</Heading>
        <div className="py-8 grid gap-4 text-justify">
          <p>
            A sua privacidade é importante para nós. É política do Tempus
            respeitar a sua privacidade em relação a qualquer informação sua que
            possamos coletar no site Tempus, e outros sites que possuímos e
            operamos.
          </p>
          <p>
            Solicitamos informações pessoais apenas quando realmente precisamos
            delas para lhe fornecer um serviço. Fazemo-lo por meios justos e
            legais, com o ssssssseu conhecimento e consentimento. Também
            informamos por o estamos a coletar e como será usado.
          </p>
          <p>
            Apenas retemos as informações coletadas pelo tempo necessário para
            fornecer o serviço solicitado. Quando armazenamos dados, protegemos
            dentro de meios comercialmente aceitáveis para evitar perdas e
            roubos, bem como acesso, divulgação, cópia, uso ou modificação não
            autorizados.
          </p>

          <p>
            Não compartilhamos informações de identificação pessoal publicamente
            ou com terceiros, exceto quando exigido por lei.
          </p>

          <p>
            O nosso site pode ter links para sites externos que não são operados
            por nós. Esteja ciente de que não temos controle sobre o conteúdo e
            práticas desses sites e não podemos aceitar responsabilidade pelas
            suas respetivas políticas de privacidade.
          </p>

          <p>
            O(a) utilizador(a) é livre para recusar a nossa solicitação de
            informações pessoais, entendendo que talvez não possamos fornecer
            alguns dos serviços desejados.
          </p>

          <p>
            O uso continuado de nosso site será considerado como aceitação das
            nossas práticas em torno da privacidade e informações pessoais. Se
            tiver alguma dúvida sobre como lidamos com dados do utilizador e
            informações pessoais, entre em contacto connosco.
          </p>
        </div>
        <Heading size="h3">Dados que recolhemos</Heading>
        <div className="py-8 grid gap-4 text-justify">
          <ul className="list-inside list-disc">
            <li>
              <span className="font-bold">Dados de início de sessão</span> -
              Quando se regista no website, recolhemos o seu nome, email, e
              password apenas para fins de início de sessão.
            </li>

            <li>
              <span className="font-bold">Dados de projetos</span> - Ao criar um
              projeto, poderá escolher se pretende (ou não) que o projeto possa
              ser acedido pelos nossos administradores caso necessite de
              suporte. Caso escolha não fornecer esta permissão, apenas teremos
              acesso ao id do projeto, que utilizamos a nível de estatística e
              correção de erros.
            </li>
          </ul>
        </div>
        <Heading size="h3">Supressão de Dados</Heading>
        <div className="py-8 grid gap-4 text-justify">
          Caso deseje que os seus dados sejam apagados da nossa base de dados,
          basta contactar a nossa equipa de suporte através do email:
          geral@avogg.pt.
        </div>
        <Heading size="h3">Política de Cookies</Heading>
        <div className="py-8 grid gap-4 text-justify">
          <Heading size="h4">O que são cookies?</Heading>

          <p>
            Como é prática comum em quase todos os sites profissionais, este
            site utiliza cookies, que são pequenos arquivos descarregados no seu
            computador, para melhorar a sua experiência. Esta página descreve
            quais informações os nossos cookies coletam e como os utilizamos.
          </p>

          <Heading size="h4">Como usamos os cookies?</Heading>
          <p>
            Utilizamos cookies por vários motivos, detalhados abaixo.
            Infelizmente, na maioria dos casos, não existem opções padrão do
            setor para desativar os cookies sem desativar completamente a
            funcionalidade e os recursos que os mesmos adicionam ao nosso site.
            É recomendável que deixe todos os cookies se não tiver a certeza se
            precisa ou não deles, caso sejam usados para fornecer um serviço que
            usa.
          </p>

          <Heading size="h4">Cookies que definimos?</Heading>
          <ul className="list-inside list-disc">
            <li>
              <span className="font-bold">Token de sessão</span> - O token de
              sessão é utilizado para manter a sua sessão guardada no navegador,
              de forma a poder navegar no website sem precisar de efetuar login
              a cada vez que visita uma página.
            </li>

            <li>
              <span className="font-bold">CookieConsent</span> - O cookie
              ‘CookieConsent’ é utilizado para guardar a informação relativa ao
              seu consentimento acerca da utilização de cookies.
            </li>
          </ul>
          <Heading size="h4">Desativar cookies</Heading>

          <p>
            Pode impedir a utilização de cookies ajustando as configurações do
            seu navegador (consulte a Ajuda do navegador para saber como o
            fazer). Esteja ciente de que a desativação de cookies afetará a
            funcionalidade deste e de muitos outros sites que visita. A
            desativação de cookies geralmente resultará na desativação de
            determinadas funcionalidades e recursos deste site. Portanto, é
            recomendável que não desative os cookies.
          </p>
        </div>
        <Heading size="h3">Política de Cookies</Heading>
        <div className="py-8 grid gap-4 text-justify">
          Caso tenha alguma dúvida, pode enviar um email para geral@avogg.pt.
        </div>
      </div>
    </>
  );
}
