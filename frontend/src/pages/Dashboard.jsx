import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  MenuItem,
  IconButton,
  Tooltip,
  Divider,
  Alert,
  Stack,
  useTheme,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  SchoolOutlined,
  ClassOutlined,
  MenuBookOutlined,
  PictureAsPdfOutlined,
  DescriptionOutlined,
  ContentCopyOutlined,
  LogoutOutlined,
} from '@mui/icons-material';
import axios from '../utils/axiosConfig';
import { exportToWord, exportToPDF } from '../utils/exportUtils';
import Loading from '../components/Loading';

function Dashboard() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    subject: '',
    classLevel: '',
    chapter: '',
  });
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [contentType, setContentType] = useState('lesson-plan');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`/api/ai/${contentType}`, formData);
      setGeneratedContent(response.data.content);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  const handleExportPDF = () => {
    exportToPDF(generatedContent, `${formData.subject}-${contentType}`);
  };

  const handleExportWord = () => {
    exportToWord(generatedContent, `${formData.subject}-${contentType}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const contentTypes = [
    { value: 'lesson-plan', label: 'Lesson Plan', icon: <MenuBookOutlined /> },
    { value: 'quiz', label: 'Quiz', icon: <ClassOutlined /> },
    { value: 'homework', label: 'Homework', icon: <SchoolOutlined /> },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{
          bgcolor: theme.palette.primary.dark,
          borderBottom: `1px solid ${theme.palette.primary.main}`,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="h1"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
            }}
          >
            Curriculum AI Assistant
          </Typography>
          <Tooltip title="Logout">
            <IconButton
              color="inherit"
              onClick={handleLogout}
              sx={{
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <LogoutOutlined />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          py: 4,
          px: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {/* Input Section */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    color: theme.palette.primary.main,
                    mb: 3,
                  }}
                >
                  Generate Content
                </Typography>

                <Stack spacing={3}>
                  {error && <Alert severity="error">{error}</Alert>}

                  <TextField
                    select
                    fullWidth
                    label="Content Type"
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    sx={{ mb: 2 }}
                  >
                    {contentTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {type.icon}
                          {type.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />

                  <TextField
                    fullWidth
                    label="Class Level"
                    name="classLevel"
                    value={formData.classLevel}
                    onChange={handleChange}
                    required
                  />

                  <TextField
                    fullWidth
                    label="Chapter"
                    name="chapter"
                    value={formData.chapter}
                    onChange={handleChange}
                    required
                  />

                  <Button
                    variant="contained"
                    onClick={handleGenerate}
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 8px rgba(0,0,0,0.2)',
                      },
                    }}
                  >
                    Generate
                  </Button>
                </Stack>
              </Paper>
            </Grid>

            {/* Output Section */}
            <Grid item xs={12} md={8}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontWeight: 'bold',
                      color: theme.palette.primary.main,
                    }}
                  >
                    Generated Content
                  </Typography>
                  
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="Copy to Clipboard">
                      <IconButton
                        onClick={handleCopy}
                        disabled={!generatedContent}
                        color="primary"
                        sx={{
                          '&:hover': {
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        <ContentCopyOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download as PDF">
                      <IconButton
                        onClick={handleExportPDF}
                        disabled={!generatedContent}
                        color="primary"
                        sx={{
                          '&:hover': {
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        <PictureAsPdfOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download as Word">
                      <IconButton
                        onClick={handleExportWord}
                        disabled={!generatedContent}
                        color="primary"
                        sx={{
                          '&:hover': {
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        <DescriptionOutlined />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Box
                  sx={{
                    flexGrow: 1,
                    overflow: 'auto',
                    maxHeight: 'calc(100vh - 250px)',
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    p: 2,
                  }}
                >
                  {loading ? (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        minHeight: 200,
                      }}
                    >
                      <Loading />
                    </Box>
                  ) : generatedContent ? (
                    <Typography
                      component="pre"
                      sx={{
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        fontFamily: 'inherit',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                      }}
                    >
                      {generatedContent}
                    </Typography>
                  ) : (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        minHeight: 200,
                        color: 'text.secondary',
                      }}
                    >
                      <MenuBookOutlined sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                      <Typography variant="body1">
                        Generated content will appear here
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Dashboard; 