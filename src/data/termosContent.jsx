import React from 'react';

export const termosContent = {
    politica: {
        title: "Política de Privacidade da Cognvox",
        content: (
            <>
                <p><strong>Última atualização:</strong> 29 de Setembro de 2025</p>
                <p>A sua privacidade é de extrema importância para a Cognvox. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos, compartilhamos e protegemos suas informações pessoais quando você utiliza nossa plataforma de recrutamento e seleção. Este documento foi elaborado em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD), Lei nº 13.709/2018.</p>

                <h3 className="font-bold mt-4">1. Informações que Coletamos</h3>
                <p>Coletamos informações que você nos fornece diretamente ao se cadastrar em nossa plataforma e se candidatar a vagas. Isso inclui, mas não se limita a:</p>
                <ul>
                    {/* ... (conteúdo sem alterações) ... */}
                    <li><strong>Dados de Identificação:</strong> Nome completo, e-mail, número de telefone, endereço (CEP, rua, número, complemento, bairro, cidade, estado).</li>
                    <li><strong>Dados Profissionais:</strong> Currículo, histórico profissional (cargos, empresas, períodos), formação acadêmica (instituições, cursos, datas), habilidades técnicas e comportamentais, idiomas e nível de proficiência.</li>
                    <li><strong>Dados Sensíveis (quando aplicável e com consentimento explícito):</strong> Informações sobre deficiência, para fins de candidatura a vagas afirmativas e garantia de acessibilidade no processo seletivo.</li>
                    <li><strong>Outras Informações:</strong> Respostas a critérios da vaga, pretensão salarial, links para redes sociais profissionais (como LinkedIn), e qualquer outra informação que você opte por compartilhar em campos abertos como "Sobre mim".</li>
                </ul>

                <h3 className="font-bold mt-4">2. Finalidade do Tratamento dos Dados</h3>
                <p>Utilizamos suas informações pessoais para as seguintes finalidades:</p>
                <ul>
                    {/* ... (conteúdo sem alterações) ... */}
                    <li>Permitir sua candidatura às vagas de emprego divulgadas em nossa plataforma.</li>
                    <li>Analisar seu perfil profissional e adequação aos pré-requisitos das vagas.</li>
                    <li>Facilitar a comunicação entre você, a Cognvox e as empresas contratantes.</li>
                    <li>Gerenciar o processo seletivo, incluindo agendamento de entrevistas e testes.</li>
                    <li>Utilizar tecnologias de análise de dados e Inteligência Artificial para otimizar a triagem e a combinação de perfis (conforme detalhado nos Termos de Uso de IA).</li>
                    <li>Realizar, com base em dados anonimizados e agregados, análises para pesquisa, desenvolvimento, aprimoramento e treinamento contínuo de nossos sistemas de inteligência artificial.</li>
                    <li>Cumprir obrigações legais e regulatórias.</li>
                </ul>

                <h3 className="font-bold mt-4">3. Compartilhamento de Dados</h3>
                <p>Suas informações serão compartilhadas com as empresas contratantes para as quais você se candidatou. Também podemos compartilhar dados com fornecedores de tecnologia e parceiros que nos auxiliam na operação da plataforma (ex: serviços de armazenamento em nuvem), sempre sob estritos contratos de confidencialidade e segurança. Não vendemos suas informações pessoais a terceiros.</p>

                <h3 className="font-bold mt-4">4. Segurança dos Dados</h3>
                <p>Adotamos medidas técnicas e organizacionais rigorosas para proteger seus dados contra acesso não autorizado, perda, alteração ou destruição. Utilizamos criptografia, controle de acesso e monitoramento contínuo de nossos sistemas para garantir a segurança das suas informações.</p>

                <h3 className="font-bold mt-4">5. Seus Direitos como Titular dos Dados</h3>
                <p>
                    De acordo com a LGPD, você tem o direito de: confirmar a existência de tratamento de seus dados; acessar seus dados; corrigir dados incompletos, inexatos ou desatualizados; solicitar a anonimização, bloqueio ou eliminação de dados desnecessários; solicitar a portabilidade dos dados e revogar o consentimento.
                </p>
                <p>
                    <strong>
                        Como cada candidatura é um envio único para uma vaga específica e não pode ser editada após a submissão, recomendamos conferir antes de enviar definitivamente o formulário.
                    </strong>
                </p>
            </>
        )
    },
    ia: {
        title: "Termos de Uso de Inteligência Artificial",
        content: (
            <>
                <p><strong>Última atualização:</strong> 29 de Setembro de 2025</p>
                <p>Ao aceitar estes termos, você concede à Cognvox o consentimento explícito para utilizar as informações fornecidas em seu formulário de inscrição e currículo em processos de análise automatizada, incluindo o uso de algoritmos de Inteligência Artificial (IA). O objetivo é proporcionar um processo seletivo mais eficiente, justo e transparente.</p>

                <h3 className="font-bold mt-4">1. Finalidade e Abrangência do Uso da IA</h3>
                <ul>
                    {/* ... (conteúdo sem alterações) ... */}
                    <li><strong>Triagem e Ranqueamento (Screening & Ranking):</strong> A IA analisa as informações do seu perfil para verificar a compatibilidade com os pré-requisitos (obrigatórios e diferenciais) definidos pela empresa contratante. Isso gera uma pontuação ou uma ordem de prioridade para revisão humana, agilizando a identificação dos perfis mais aderentes.</li>
                    <li><strong>Análise de Habilidades (Skills Analysis):</strong> Nossos algoritmos identificam e extraem as habilidades mencionadas em seu currículo, comparando-as com as competências essenciais para a vaga.</li>
                    <li><strong>Sugestão de Vagas (Job Matching):</strong> Com base no seu perfil, nosso sistema pode proativamente sugerir outras vagas abertas que possam ser do seu interesse, mesmo que você não tenha se candidatado diretamente a elas.</li>
                </ul>

                <h3 className="font-bold mt-4">2. Como a Análise Funciona</h3>
                <p>O processo não é uma "caixa-preta". A análise da IA se baseia em critérios objetivos e nos dados que você forneceu. Por exemplo, se uma vaga exige "5 anos de experiência com Python" e "Inglês Avançado", o sistema buscará essas palavras-chave e estruturas em seu histórico profissional e de idiomas, atribuindo uma pontuação de aderência. As respostas fornecidas nos campos de "Pré-requisitos" do formulário têm um peso significativo nessa análise.</p>

                <h3 className="font-bold mt-4">3. Transparência e Supervisão Humana</h3>
                <p>É fundamental ressaltar que a Inteligência Artificial é uma ferramenta de apoio à decisão, e não a decisão final. <strong>Todas as etapas críticas do processo seletivo, incluindo a aprovação para entrevistas e a contratação, são realizadas e validadas por recrutadores humanos.</strong> A IA nos ajuda a organizar e priorizar, garantindo que os recrutadores possam dedicar mais tempo à análise qualitativa dos perfis mais promissores. Nosso compromisso é com a redução de vieses inconscientes, e nossos algoritmos são periodicamente auditados para garantir a equidade do processo.</p>

                <h3 className="font-bold mt-4">4. Aprimoramento e Treinamento do Sistema</h3>
                <p>Você autoriza, de forma livre e esclarecida, que os dados aqui inseridos sejam utilizados para fins de análise, aprimoramento e treinamento de sistemas de inteligência artificial, respeitando as leis aplicáveis de proteção de dados e privacidade. Você está ciente de que essa autorização inclui o uso dos dados de forma anônima e agregada, sem identificação pessoal, exclusivamente para fins de pesquisa, desenvolvimento e melhoria contínua dos serviços oferecidos.</p>

                <h3 className="font-bold mt-4">5. Limitações e Responsabilidade</h3>
                <p>
                    Você declara que as informações fornecidas neste formulário são verdadeiras e de sua inteira responsabilidade.
                    <strong>
                        Dado que a candidatura é um envio único e não pode ser alterada após finalizada, é fundamental que você revise todos os dados com atenção antes da submissão.
                    </strong>
                    {' '}Você compreende que a análise automatizada é baseada exclusivamente nas informações fornecidas, e que dados imprecisos ou incompletos podem impactar o resultado da análise. Ao aceitar estes termos, você concorda em não responsabilizar a Cognvox por resultados decorrentes de dados incorretos fornecidos por você.
                </p>
            </>
        )
    }
};