import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Stack,
  useTheme,
  Card,
  CardContent,
  Avatar,
  IconButton,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import QuizIcon from '@mui/icons-material/Quiz';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

function LandingPage() {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      icon: <AutoStoriesIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Lesson Plans',
      description: 'Generate detailed lesson plans with learning objectives, activities, and assessments.',
      image: 'https://img.freepik.com/free-vector/teacher-standing-near-blackboard-holding-stick-isolated-flat-vector-illustration-cartoon-woman-character-near-chalkboard-pointing-alphabet_74855-8600.jpg'
    },
    {
      icon: <QuizIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Quizzes',
      description: 'Create comprehensive quizzes with multiple choice, short answer, and long answer questions.',
      image: 'https://img.freepik.com/free-vector/online-test-concept-illustration_114360-5565.jpg'
    },
    {
      icon: <AssignmentIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Homework',
      description: 'Design engaging homework assignments with practice problems and creative projects.',
      image: 'https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149334862.jpg'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section with Background Image */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: 12,
          position: 'relative',
          backgroundImage: 'url(https://img.freepik.com/free-vector/abstract-geometric-wireframe-background_52683-59421.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <SchoolIcon sx={{ fontSize: 80, mb: 3 }} />
          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            Curriculum AI Assistant
          </Typography>
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              mb: 6,
              maxWidth: '800px',
              mx: 'auto',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            Your intelligent companion for curriculum planning and content generation. 
            Powered by AI to make teaching easier and more effective.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            justifyContent="center"
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/login')}
              sx={{ 
                px: 4, 
                py: 2,
                fontSize: '1.2rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 8px rgba(0,0,0,0.2)',
                }
              }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              onClick={() => navigate('/signup')}
              sx={{ 
                px: 4, 
                py: 2,
                fontSize: '1.2rem',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateY(-2px)',
                }
              }}
            >
              Sign Up
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography 
          variant="h2" 
          component="h2" 
          textAlign="center" 
          gutterBottom
          sx={{ 
            mb: 8,
            fontWeight: 'bold',
            color: theme.palette.primary.main
          }}
        >
          Features
        </Typography>
        <Grid container spacing={6}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                elevation={4}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <Box
                  sx={{
                    height: 200,
                    overflow: 'hidden',
                    '& img': {
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s',
                    },
                    '&:hover img': {
                      transform: 'scale(1.1)',
                    }
                  }}
                >
                  <img src={feature.image} alt={feature.title} />
                </Box>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  {feature.icon}
                  <Typography variant="h5" component="h3" sx={{ my: 2, fontWeight: 'bold' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Creator Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 10 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            component="h2" 
            textAlign="center" 
            gutterBottom
            sx={{ 
              mb: 6,
              fontWeight: 'bold',
              color: theme.palette.primary.main
            }}
          >
            Creator
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <Avatar
              sx={{
                width: 150,
                height: 150,
                mb: 3,
                border: `4px solid ${theme.palette.primary.main}`
              }}
              alt="Om Akshay"
              src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
            />
            <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
              Yash Kumar
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
              Full Stack Developer
            </Typography>
            <Stack direction="row" spacing={2}>
              <IconButton 
                color="primary" 
                component="a" 
                href="https://github.com/yashkumar8203" 
                target="_blank"
                sx={{ '&:hover': { transform: 'translateY(-2px)' } }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton 
                color="primary" 
                component="a" 
                href="https://www.linkedin.com/in/om-akshay-a4918824b/" 
                target="_blank"
                sx={{ '&:hover': { transform: 'translateY(-2px)' } }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton 
                color="primary" 
                component="a" 
                href="mailto:omakshay17@gmail.com"
                sx={{ '&:hover': { transform: 'translateY(-2px)' } }}
              >
                <EmailIcon />
              </IconButton>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', py: 4 }}>
        <Container maxWidth="lg">
          <Typography textAlign="center" variant="body1">
            © {new Date().getFullYear()} Curriculum AI Assistant. Created by Yash Kumar. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default LandingPage; 