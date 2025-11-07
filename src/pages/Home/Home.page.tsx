import React from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  Card,
  IconButton,
  styled
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

// Página Home usando apenas Material-UI - sem dependências externas

// Styled components para manter o design original
const HeroSection = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  gap: '80px',
  marginTop: '50px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '40px',
  },
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Radio Canada", sans-serif',
  fontSize: '64px',
  marginBottom: '20px',
  [theme.breakpoints.down('lg')]: {
    fontSize: '48px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '36px',
  },
}));

const HeroText = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 400,
  [theme.breakpoints.down('lg')]: {
    fontSize: '24px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '20px',
  },
}));

// Removido FloatingImage pois não precisamos mais

const SectionTitle = styled(Typography)({
  fontSize: '36px',
  fontFamily: '"Radio Canada", sans-serif',
  fontWeight: 700,
  color: '#62d4a4',
  textAlign: 'center',
});

const ServicesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  gap: '20px',
  marginTop: '20px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const ServiceItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  '& img': {
    width: '32px',
    height: '32px',
  },
  '& p': {
    fontFamily: '"Radio Canada", sans-serif',
    fontSize: '22px',
    fontWeight: 400,
  },
});

const VerticalLine = styled(Box)(({ theme }) => ({
  borderLeft: '2px solid #06d7a0',
  height: '100px',
  margin: '0 20px',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const CarouselContainer = styled(Box)({
  textAlign: 'center',
  padding: '50px 0',
});

const StyledButton = styled(Button)({
  backgroundColor: '#62d4a4',
  color: 'black',
  fontWeight: 'semibold',
  '&:hover': {
    backgroundColor: '#4fb885',
  },
});

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'transparent',
  paddingBottom: '80px',
  marginTop: '50px',
  '& .footer-content': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: '20px',
    },
  },
  '& .social-links': {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  },
}));

export const Home: React.FC = () => {
  // Dados do carousel
  const carouselItems = [
    { title: 'Business', icon: '/src/assets/home/areaIcon1.png' },
    { title: 'Tech Recruiter', icon: '/src/assets/home/areaIcon2.png' },
    { title: 'Produtos', icon: '/src/assets/home/areaIcon3.png' },
    { title: 'Ágil', icon: '/src/assets/home/areaIcon4.png' },
    { title: 'Social Media', icon: '/src/assets/home/areaIcon5.png' },
    { title: 'UI & UX Design', icon: '/src/assets/home/areaIcon6.png' },
    { title: 'Front-end', icon: '/src/assets/home/areaIcon7.png' },
    { title: 'Back-end', icon: '/src/assets/home/areaIcon8.png' },
    { title: 'Data', icon: '/src/assets/home/areaIcon9.png' },
    { title: 'Mobile', icon: '/src/assets/home/areaIcon10.png' },
    { title: 'QA', icon: '/src/assets/home/areaIcon11.png' },
    { title: 'DevOps', icon: '/src/assets/home/areaIcon12.png' },
  ];

  const socialLinks = [
    { name: 'Github', url: 'https://github.com/SouJunior-Labs', icon: '/src/assets/home/Github.png' },
    { name: 'Discord', url: 'https://forms.gle/uptNHWPrLn4CgqMf9', icon: '/src/assets/home/Discord.png' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/soujunior-labs/', icon: '/src/assets/home/Linkedin.png' },
    { name: 'Instagram', url: 'https://www.instagram.com/soujunior.tech/', icon: '/src/assets/home/Instagram.png' },
    { name: 'YouTube', url: 'https://www.youtube.com/@soujuniortech', icon: '/src/assets/home/YouTube.png' },
    { name: 'Twitter', url: 'https://twitter.com/SouJunior_Tech', icon: '/src/assets/home/Twitter.png' },
    { name: 'Facebook', url: 'https://www.facebook.com/people/SouJunior/100086671131030', icon: '/src/assets/home/Facebook.png' },
  ];

  return (
    <Box className="home-page" sx={{ padding: 0, display: 'flex', flexDirection: 'column', gap: '75px' }}>
      {/* Hero Section */}
      <HeroSection maxWidth="xl">
        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <HeroTitle variant="h1" component="h1">
              Vem pro SouJunior!
            </HeroTitle>
            <HeroText>
              Aqui você desenvolve produtos reais e aprimora habilidades práticas para conquistar o
              mercado de trabalho.
            </HeroText>
            <StyledButton
              size="large"
              href="https://forms.gle/uptNHWPrLn4CgqMf9"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ marginTop: '10px', maxWidth: 'fit-content' }}
            >
              Quero fazer parte
            </StyledButton>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              width: { xs: '200px', md: '300px', lg: '400px' },
              height: { xs: '200px', md: '300px', lg: '400px' },
              backgroundColor: '#62d4a4',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'float 6s ease-in-out infinite',
              filter: 'drop-shadow(0 0 15px #06d7a033)',
              '@keyframes float': {
                '0%, 100%': {
                  transform: 'translateY(0)',
                },
                '50%': {
                  transform: 'translateY(-20px)',
                },
              },
            }}
          >
            <Typography 
              sx={{ 
                fontSize: { xs: '24px', md: '36px', lg: '48px' },
                fontWeight: 'bold',
                color: 'black',
                textAlign: 'center'
              }}
            >
              SJ
            </Typography>
          </Box>
        </Box>
      </HeroSection>

      {/* Services Section */}
      <Container maxWidth="xl" className="services-section">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SectionTitle variant="h2" sx={{ maxWidth: '1100px', marginBottom: '40px' }}>
            Ingressar no mundo tech pode ser desafiador e, buscando ajudar nesse desafio, a SouJunior
            Labs, oferece:
          </SectionTitle>
          
          <ServicesContainer>
            <Box>
              <ServiceItem>
                <Box 
                  sx={{ 
                    width: '32px', 
                    height: '32px', 
                    backgroundColor: '#62d4a4', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>1</Typography>
                </Box>
                <Typography>Suporte ao desenvolvimento de novos produtos;</Typography>
              </ServiceItem>
              <ServiceItem sx={{ marginTop: '20px' }}>
                <Box 
                  sx={{ 
                    width: '32px', 
                    height: '32px', 
                    backgroundColor: '#62d4a4', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>2</Typography>
                </Box>
                <Typography>Aprimoramento de habilidades práticas em equipes (soft e hard skills);</Typography>
              </ServiceItem>
            </Box>
            
            <VerticalLine />
            
            <Box>
              <ServiceItem>
                <Box 
                  sx={{ 
                    width: '32px', 
                    height: '32px', 
                    backgroundColor: '#62d4a4', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>3</Typography>
                </Box>
                <Typography>Expansão de conexões e networking;</Typography>
              </ServiceItem>
              <ServiceItem sx={{ marginTop: '20px' }}>
                <Box 
                  sx={{ 
                    width: '32px', 
                    height: '32px', 
                    backgroundColor: '#62d4a4', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>4</Typography>
                </Box>
                <Typography>Colaboração na construção e fortalecimento de portfólios e currículos;</Typography>
              </ServiceItem>
            </Box>
          </ServicesContainer>
        </Box>
      </Container>

      {/* About Section */}
      <Container maxWidth="xl" className="about-section">
        <Grid container spacing={4} alignItems="center" justifyContent="space-evenly">
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                width: '100%',
                maxWidth: '500px',
                height: '300px',
                backgroundColor: '#40715c',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto'
              }}
            >
              <Typography 
                sx={{ 
                  fontSize: { xs: '32px', md: '48px' },
                  fontWeight: 'bold',
                  color: '#62d4a4',
                  textAlign: 'center'
                }}
              >
                About Us
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontSize: '32px',
                fontFamily: '"Radio Canada", sans-serif',
                fontWeight: 700,
                color: '#62d4a4',
                marginBottom: '20px'
              }}
            >
              Somos uma iniciativa voluntária comprometida em criar produtos reais.
            </Typography>
            <Typography 
              sx={{ 
                fontFamily: '"Inter", sans-serif',
                fontSize: '22px',
                fontWeight: 400
              }}
            >
              Nosso propósito é oferecer suporte àqueles que buscam experiência prática, através da
              criação colaborativa de produtos inovadores, assim impulsionando o desenvolvimento
              profissional dos Juniors na área tech.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Platform Section */}
      <Container maxWidth="xl" className="howToUse-section">
        <Grid container spacing={4} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" sx={{ color: '#62d4a4', marginBottom: '20px' }}>
              A Plataforma
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Typography sx={{ fontSize: '22px' }}>
                Nossa plataforma foi projetada para auxiliar no gerenciamento dos produtos criados na
                SouJunior Labs. Por enquanto, ela{' '}
                <strong>está disponível apenas para os Founders dos produtos já cadastrados,</strong> mas
                em breve todos poderão acessá-la.
              </Typography>
              <Typography sx={{ fontSize: '22px' }}>
                Se você é um Founder ativo, primeiro precisamos fazer seu cadastro. Bem simples! Na aba de
                registro, confirme que quer realizar o cadastro e, de posse do token enviado no canal
                dedicado aos Founders, no Discord da Sou Junior Labs, realize o seu cadastro.
              </Typography>
              <Typography sx={{ fontSize: '22px' }}>
                Não esqueça de cadastrar seu produto e squad. Como o intuito é termos um local oficial
                para nossos produtos, é importante manter esses dados sempre atualizados. Em breve,
                teremos mais novidades.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                width: '100%',
                height: '350px',
                backgroundColor: '#335445',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto'
              }}
            >
              <Typography 
                sx={{ 
                  fontSize: { xs: '24px', md: '36px' },
                  fontWeight: 'bold',
                  color: '#62d4a4',
                  textAlign: 'center'
                }}
              >
                Platform
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Occupation Section */}
      <Container maxWidth="xl" className="occupation-section">
        <Box sx={{ marginBottom: '40px' }}>
          <SectionTitle variant="h2" sx={{ marginBottom: '20px' }}>
            Aqui, todas as áreas são bem-vindas:
          </SectionTitle>
          <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Typography sx={{ fontSize: '22px', maxWidth: '800px', textAlign: 'center' }}>
              Participe da nossa comunidade e explore diversas oportunidades disponíveis
            </Typography>
            <StyledButton
              size="large"
              href="https://forms.gle/uptNHWPrLn4CgqMf9"
              target="_blank"
              rel="noopener noreferrer"
            >
              Quero fazer parte
            </StyledButton>
          </Box>
        </Box>

        {/* Areas Grid */}
        <CarouselContainer>
          <Grid container spacing={3} justifyContent="center">
            {carouselItems.map((item, index) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                <Card 
                  sx={{ 
                    backgroundColor: '#40715c',
                    borderRadius: '1rem',
                    cursor: 'pointer',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '120px',
                    '&:hover': {
                      backgroundColor: '#4a8268',
                      transform: 'translateY(-2px)',
                      transition: 'all 0.3s ease',
                    },
                  }}
                >
                  <Box 
                    sx={{ 
                      width: '60px', 
                      height: '60px', 
                      backgroundColor: '#62d4a4',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '10px'
                    }}
                  >
                    <Typography sx={{ fontSize: '24px', fontWeight: 'bold' }}>
                      {item.title.charAt(0)}
                    </Typography>
                  </Box>
                  <Typography 
                    sx={{ 
                      fontSize: '14px',
                      fontFamily: '"Radio Canada", sans-serif',
                      fontWeight: 400,
                      color: 'white',
                      textAlign: 'center'
                    }}
                  >
                    {item.title}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CarouselContainer>
      </Container>

      {/* Contact Section */}
      <Container maxWidth="xl" className="contact-section">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ 
            borderImage: 'linear-gradient(to right, #60a69c, #000) 1',
            borderTop: '1px solid',
            height: '1px',
            margin: '20px 0',
            width: '100%'
          }} />
          
          <Card sx={{ 
            backgroundColor: 'transparent',
            boxShadow: 'none',
            border: 'none',
            textAlign: 'center',
            padding: '40px',
            width: '100%'
          }}>
            <SectionTitle variant="h2" sx={{ marginBottom: '12px' }}>
              Precisa de Ajuda?
            </SectionTitle>
            <Typography sx={{ maxWidth: '800px', margin: '0 auto', fontSize: '18px' }}>
              Se estiver enfrentando alguma dificuldade ao utilizar nossa plataforma ou se possuir
              dúvidas ou sugestões que gostaria de compartilhar, entre em contato conosco através do
              canal "Founders only" no Discord da Sou Junior Labs. Nossa equipe ficará feliz em
              ouvi-lo e ajudá-lo.
            </Typography>
          </Card>
        </Box>
      </Container>

      {/* Footer */}
      <FooterContainer>
        <Container maxWidth="xl">
          <Box className="footer-content">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box 
                sx={{ 
                  height: '36px', 
                  width: '36px', 
                  backgroundColor: '#62d4a4',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px'
                }}
              >
                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>
                  SJ
                </Typography>
              </Box>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 'bold',
                  fontFamily: '"Radio Canada", serif',
                  color: 'white'
                }}
              >
                SouJunior
              </Typography>
            </Box>
            
            <Box>
              <Typography 
                sx={{ 
                  fontFamily: '"Radio Canada", sans-serif',
                  color: '#62d4a4',
                  fontSize: '32px',
                  fontWeight: 700,
                  marginBottom: '10px',
                  textAlign: 'center'
                }}
              >
                Faça parte da nossa comunidade!
              </Typography>
              
              <Box className="social-links">
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      backgroundColor: '#40715c',
                      color: '#62d4a4',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      '&:hover': {
                        backgroundColor: '#62d4a4',
                        color: 'black',
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                      {social.name.charAt(0)}
                    </Typography>
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </FooterContainer>
    </Box>
  );
};

