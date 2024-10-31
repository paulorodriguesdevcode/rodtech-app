"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import logo from '../assets/logo-branca.png';
import qrcodeDoacoes from '../assets/qrcode-doacoes.png';

export default function Page() {
  const Section = ({ children }: any) => {
    const { ref, inView } = useInView({
      triggerOnce: false,
      threshold: 0.1,
    });

    return (
      <motion.section
        ref={ref}
        className="bg-white p-6 rounded shadow-md"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.section>
    );
  };

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-indigo-950 via-indigo-800 to-indigo-700 
      dark:from-black dark:via-indigo-950 dark:to-indigo-900 flex justify-center">
        <Image
          src={logo}
          alt="Logo"
          width={'400'}
          height={'400'}
        />
      </header>

      <main className="p-8 space-y-12">
        <Section className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-indigo-900 mb-6">Quem Somos</h2>
          <p className="text-indigo-950 leading-relaxed">
            Bem-vindo ao site da Igreja Sara Nossa Terra, uma chama de esperança e transformação em Sabará há 28 anos.
            Nossa história começou em Brasília (DF) em 1992, com a palavra profética de Deus proferida por seus fundadores, Bispos Robson e Lúcia Rodovalho. Desde então, nossa missão tem sido clara: fazer de cada pessoa um cristão, de cada cristão um discípulo e de cada discípulo um líder, multiplicando os ensinamentos do Evangelho por meio da abertura de novas igrejas.
          </p>
          <p className="text-indigo-950 leading-relaxed mt-4">
            Na Igreja Sara Nossa Terra, somos dedicados a acolher todos os membros da família com amor e atenção. Contamos com uma estrutura completa para atender a todas as idades e necessidades:
          </p>

          <div className="mt-6 mb-10">
            <ul className="list-disc list-inside text-lg text-gray-700">
              <li><strong>Berçário</strong>: Um espaço acolhedor para receber os papais e seus bebês.</li>
              <li><strong>Escolinha Kids</strong>: Um ambiente dedicado ao ensino e cuidado das nossas crianças.</li>
              <li><strong>Equipe Teens</strong>: Cuidados e ensinamento especiais para pré-adolescentes.</li>
              <li><strong>Arena Jovem</strong>: Um culto vibrante que desafia e apoia nossos jovens.</li>
              <li><strong>Ministério da Família</strong>: Cursos e recursos projetados para fortalecer casais e apoiar na criação de filhos.</li>
            </ul>
          </div>

          <p className="text-indigo-950 leading-relaxed mt-4">
            Estamos aqui para servir e apoiar sua família em todos os aspectos da vida. Convidamos você a se unir a nós em nossa jornada de fé, amor e serviço e a experimentar a plenitude de Deus em cada área de sua vida.
            Seja bem-vindo à nossa família. Seja bem-vindo à Igreja Sara Nossa Terra.
          </p>
        </Section>


        <Section className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-indigo-900 mb-6">Nossa Agenda</h2>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-indigo-800 mb-4">Cultos:</h3>
            <ul className="list-disc list-inside text-lg text-gray-700">
              <li><strong>Arena Jovem:</strong> Sábados às 19:30</li>
              <li><strong>Culto da Família:</strong> Domingos às 19:00</li>
              <li><strong>Culto de Fé:</strong> Terças às 20:00</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-indigo-800 mb-4">Eventos:</h3>
            <ul className="list-disc list-inside text-lg text-gray-700">
              <li><strong>16/08/2024:</strong> Revisão de Vidas</li>
              <li><strong>14/09/2024:</strong> Congresso de Homens 2024</li>
              <li><strong>04/10/2024:</strong> Revisão de Vidas</li>
              <li><strong>02/11/2024:</strong> Treinamento Avançado de Liderança</li>
              <li><strong>31/12/2024:</strong> Culto da Virada 2025</li>
            </ul>
          </div>
        </Section>


        <Section className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-indigo-900 mb-6">Nossas Células</h2>
          <ul className="list-disc list-inside text-lg text-gray-700">
            <li>Rua Orquídea, 26 - Adelmolandia, Segunda-feira às 18:00</li>
            <li>Rua 7, 61 - Alto Bela Vista, Quinta-feira às 19:30</li>
            <li>Rua Santa Helena, 90 - Córrego da Ilha, Segunda-feira às 19:00 (quinzenalmente)</li>
            <li>Rua Salvador Correia de Sá, 122 - Rosário 1, Sexta-feira às 20:00</li>
            <li>Rua Santa Cruz, 569 - Morro da Cruz, Sábado às 16:30</li>
            <li>Rua Pedro Teixeira de Andrade, 69 - Pompéu, Sexta-feira às 19:30</li>
            <li>Rua Vista Alegre, 244 - Córrego da Ilha, Quarta-feira às 19:30</li>
            <li>Rua do Campo, 25 - Santa Rita Durão, Primeira sexta do mês às 19:30</li>
            <li>Rua 2 Galego, 136 - Sabará, Quinta-feira às 20:30</li>
            <li>Rua Santa Tereza, 619 - Córrego da Ilha, Quarta-feira às 20:00</li>
          </ul>
        </Section>

        <Section>
          <h2 className="text-3xl font-bold text-indigo-900 mb-6">Nossos Links</h2>
          <div className="flex flex-col sm:flex-row">
            <div className="flex items-center mb-4 sm:mb-0 sm:mr-8">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="mr-2 text-indigo-600 font-semibold"
                href="https://www.youtube.com/@rodtech.tech"
              >
                YouTube 
              </a>
              <p className="text-red-700 font-bold">@rodtech.tech</p>
            </div>
            <div className="flex items-center border-t-2 sm:border-t-0 sm:border-l-2 border-gray-300 pt-4 sm:pt-0 sm:pl-8">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="mr-2 text-indigo-600 font-semibold"
                href="https://www.instagram.com/rodtech.techoficial"
              >
                Instagram
              </a>
              <p className="text-orange-700 font-bold">@rodtech.techoficial</p>
            </div>
          </div>
        </Section>


        <Section className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-indigo-900 mb-6">Fale Conosco</h2>
          <p className="text-lg font-semibold text-gray-700 mb-4">Entre em contato pelo nosso número:</p>
          <a
            href="https://wa.me/553193614179"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold text-green-600 mb-6 inline-block"
          >
            +55 31 9361-4179
          </a>



        </Section>

        

        <Section className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-indigo-900 mb-6">Nosso Endereço</h2>
          <p className="text-indigo-950 mb-6">
            Av. Expedicionário Romeu Jer Dantas, 221 - Caieira, Sabará - MG, 34505-045
          </p>
          <div className="relative h-64">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3754.2712219789973!2d-43.83393118545299!3d-19.893413286616428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa698f95a9eb761%3A0x6745d7d784ae4b05!2sAv.%20Expedicion%C3%A1rio%20Romeu%20Jer%20Dantas%2C%20221%20-%20Caieira%2C%20Sabar%C3%A1%20-%20MG%2C%2034505-045!5e0!3m2!1sen!2sbr!4v1629477597614!5m2!1sen!2sbr"
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
        </Section>


        <Section className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-indigo-900 mb-6">Faça sua Doação</h2>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700 mb-4">Escaneie o QRCode abaixo:</p>
            <Image
              src={qrcodeDoacoes}
              alt="QRCode para doações"
              width={150}
              height={150}
              className="mx-auto mb-4"
            />
            <p className="text-lg font-semibold text-gray-700 mb-2">Chave Pix:</p>
            <p className="text-xl font-bold text-indigo-900">sabaradz@cesnt.com.br</p>
          </div>
        </Section>

      </main>

      <footer className="bg-gradient-to-r from-indigo-950 via-indigo-800 to-indigo-700 
      dark:from-black dark:via-indigo-950 dark:to-indigo-900 text-white p-4 text-center">
        <a target="_blank" href="https://www.instagram.com/paulorodriguesdev/">Desenvolvido com ♥ por ⚡Paulo Rodrigues⚡</a>
      </footer>
    </div>
  );
};
