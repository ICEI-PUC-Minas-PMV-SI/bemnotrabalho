import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Heart, 
  Shield, 
  Users, 
  MessageCircle, 
  BookOpen, 
  Phone, 
  Mail, 
  MapPin,
  Star,
  ChevronRight,
  CheckCircle,
  UserPlus,
  Briefcase,
  Target,
  Eye,
  Award,
  Menu,
  X,
  Send,
  Plus
} from 'lucide-react'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [showProfessionalForm, setShowProfessionalForm] = useState(false)
  const [showForumPost, setShowForumPost] = useState(false)
  
  const [formData, setFormData] = useState({
    participar: {
      nome: '',
      email: '',
      telefone: '',
      endereco: '',
      idade: '',
      escolaridade: '',
      cargo: '',
      empresa: '',
      nickname: ''
    },
    apoiar: {
      nome: '',
      email: '',
      telefone: '',
      especialidade: '',
      mensagem: ''
    },
    novoProfissional: {
      nome: '',
      email: '',
      telefone: '',
      especialidade: '',
      descricao: '',
      localizacao: ''
    },
    novoPost: {
      titulo: '',
      conteudo: '',
      autor: ''
    }
  })

  const [profissionais, setProfissionais] = useState([
    {
      id: 1,
      nome: 'Simone Queiroz',
      especialidade: 'Recursos Humanos',
      descricao: 'Especialista em direitos trabalhistas e mediação de conflitos no ambiente profissional.',
      avaliacao: 4.9,
      localizacao: 'São Paulo, SP',
      telefone: '(11) 99999-9999',
      email: 'simone.queiroz@bemnotrabalho.com'
    }
  ])

  const [posts, setPosts] = useState([
    {
      id: 1,
      titulo: 'Como denunciar assédio no trabalho',
      autor: 'Ana Silva',
      data: '2024-09-28',
      resumo: 'Compartilho minha experiência e os passos que tomei para denunciar...',
      respostas: 12,
      respostasLista: []
    },
    {
      id: 2,
      titulo: 'Encontrando força na comunidade',
      autor: 'Marina Santos',
      data: '2024-09-25',
      resumo: 'Quero agradecer a todas que me apoiaram durante esse processo...',
      respostas: 8,
      respostasLista: []
    }
  ])

  // Frases motivacionais de mulheres brasileiras famosas
  const frasesMotivacionais = [
    {
      frase: "O que vale na vida não é o ponto de partida e sim a caminhada. Caminhando e semeando, no fim, terás o que colher.",
      autora: "Cora Coralina"
    },
    {
      frase: "Recria tua vida, sempre, sempre. Remove pedras e planta roseiras e faz doces. Recomeça.",
      autora: "Cora Coralina"
    },
    {
      frase: "A verdadeira coragem é ir atrás de seu sonho mesmo quando todos dizem que ele é impossível.",
      autora: "Cora Coralina"
    },
    {
      frase: "A primavera chegará, mesmo que ninguém mais saiba seu nome, nem acredite no calendário, nem possua jardim para recebê-la.",
      autora: "Cecília Meireles"
    },
    {
      frase: "Feliz aquele que transfere o que sabe e aprende o que ensina.",
      autora: "Cora Coralina"
    },
    {
      frase: "O saber a gente aprende com os mestres e os livros. A sabedoria se aprende é com a vida e com os humildes.",
      autora: "Cora Coralina"
    }
  ]

  const [fraseAtual, setFraseAtual] = useState(0)
  const [expandedPost, setExpandedPost] = useState(null)
  const [showResponseForm, setShowResponseForm] = useState(null)
  const [responseText, setResponseText] = useState('')

  // Função para scroll suave
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setIsMenuOpen(false)
    }
  }

  // Função para detectar seção ativa durante scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'sobre', 'servicos', 'profissionais', 'forum', 'contato']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Rotação automática das frases motivacionais
  useEffect(() => {
    const interval = setInterval(() => {
      setFraseAtual(prev => (prev + 1) % frasesMotivacionais.length)
    }, 5000) // Muda a cada 5 segundos

    return () => clearInterval(interval)
  }, [frasesMotivacionais.length])

  const handleInputChange = (form, field, value) => {
    setFormData(prev => ({
      ...prev,
      [form]: {
        ...prev[form],
        [field]: value
      }
    }))
  }

  const handleSubmit = (formType) => {
    const data = formData[formType]
    
    // Validação básica
    if (formType === 'participar' && (!data.nome || !data.email || !data.telefone)) {
      alert('Por favor, preencha os campos obrigatórios (Nome, E-mail e Telefone)')
      return
    }
    
    if (formType === 'apoiar' && (!data.nome || !data.email || !data.especialidade)) {
      alert('Por favor, preencha os campos obrigatórios (Nome, E-mail e Especialidade)')
      return
    }

    console.log(`Formulário ${formType} enviado:`, data)
    alert(`Formulário ${formType} enviado com sucesso! Entraremos em contato em breve.`)
    
    // Limpar formulário
    setFormData(prev => ({
      ...prev,
      [formType]: formType === 'participar' ? {
        nome: '', email: '', telefone: '', endereco: '', idade: '', 
        escolaridade: '', cargo: '', empresa: '', nickname: ''
      } : {
        nome: '', email: '', telefone: '', especialidade: '', mensagem: ''
      }
    }))
  }

  const handleAddProfessional = () => {
    const data = formData.novoProfissional
    
    if (!data.nome || !data.email || !data.especialidade) {
      alert('Por favor, preencha os campos obrigatórios')
      return
    }

    const novoProfissional = {
      id: profissionais.length + 1,
      nome: data.nome,
      especialidade: data.especialidade,
      descricao: data.descricao || 'Profissional qualificado para apoio e orientação.',
      avaliacao: 5.0,
      localizacao: data.localizacao || 'Local não informado',
      telefone: data.telefone || 'Telefone não informado',
      email: data.email
    }

    setProfissionais(prev => [...prev, novoProfissional])
    alert('Profissional cadastrado com sucesso!')
    setShowProfessionalForm(false)
    
    // Limpar formulário
    setFormData(prev => ({
      ...prev,
      novoProfissional: {
        nome: '', email: '', telefone: '', especialidade: '', descricao: '', localizacao: ''
      }
    }))
  }

  const handleAddPost = () => {
    const data = formData.novoPost
    
    if (!data.titulo || !data.conteudo || !data.autor) {
      alert('Por favor, preencha todos os campos')
      return
    }

    const novoPost = {
      id: posts.length + 1,
      titulo: data.titulo,
      autor: data.autor,
      data: new Date().toISOString().split('T')[0],
      resumo: data.conteudo.substring(0, 100) + '...',
      respostas: 0,
      respostasLista: [],
      conteudoCompleto: data.conteudo
    }

    setPosts(prev => [novoPost, ...prev])
    alert('Post criado com sucesso!')
    setShowForumPost(false)
    
    // Limpar formulário
    setFormData(prev => ({
      ...prev,
      novoPost: { titulo: '', conteudo: '', autor: '' }
    }))
  }

  const handleAddResponse = (postId) => {
    if (!responseText.trim()) {
      alert('Por favor, escreva uma resposta')
      return
    }

    const novaResposta = {
      id: Date.now(),
      texto: responseText,
      autor: 'Usuário Anônimo',
      data: new Date().toISOString().split('T')[0]
    }

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            respostasLista: [...(post.respostasLista || []), novaResposta],
            respostas: (post.respostas || 0) + 1
          }
        : post
    ))

    setResponseText('')
    setShowResponseForm(null)
    alert('Resposta adicionada com sucesso!')
  }

  const toggleExpandPost = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="navbar sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('inicio')}>
              <img 
                src="/logo-bem-no-trabalho.jpeg" 
                alt="Bem no Trabalho Logo" 
                className="w-10 h-10 rounded-full object-cover logo-bem-trabalho"
              />
              <span className="text-xl font-bold text-primary navbar-brand">Bem no Trabalho</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {[
                { id: 'inicio', label: 'Início' },
                { id: 'sobre', label: 'Sobre' },
                { id: 'servicos', label: 'Serviços' },
                { id: 'profissionais', label: 'Profissionais' },
                { id: 'forum', label: 'Fórum' },
                { id: 'contato', label: 'Contato' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`navbar-nav nav-link hover:text-green-600 transition-smooth ${
                    activeSection === item.id ? 'text-green-600 font-semibold' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>

            {/* Desktop CTA Button */}
            <Button className="hidden md:block nav-button" onClick={() => scrollToSection('contato')}>
              Quero fazer parte
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col space-y-2">
                {[
                  { id: 'inicio', label: 'Início' },
                  { id: 'sobre', label: 'Sobre' },
                  { id: 'servicos', label: 'Serviços' },
                  { id: 'profissionais', label: 'Profissionais' },
                  { id: 'forum', label: 'Fórum' },
                  { id: 'contato', label: 'Contato' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left navbar-nav nav-link hover:text-green-600 transition-smooth py-2 ${
                      activeSection === item.id ? 'text-green-600 font-semibold' : ''
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <Button className="nav-button mt-4" onClick={() => scrollToSection('contato')}>
                  Quero fazer parte
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="hero-section py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <img 
              src="/logo-bem-no-trabalho.jpeg" 
              alt="Bem no Trabalho Logo" 
              className="w-32 h-32 rounded-full object-cover logo-bem-trabalho shadow-2xl border-4 border-white"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            Toda mulher merece respeito, segurança e dignidade no trabalho
          </h1>
          
          <p className="text-xl md:text-2xl text-secondary mb-8 max-w-4xl mx-auto">
            Bem no Trabalho é a plataforma de acolhida e apoio para mulheres vítimas de 
            discriminação e violência no ambiente profissional.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-primary px-8 py-3 text-lg" onClick={() => scrollToSection('contato')}>
              Quero fazer parte
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="btn-secondary px-8 py-3 text-lg" onClick={() => scrollToSection('sobre')}>
              Saiba mais
            </Button>
          </div>
        </div>
      </section>

      {/* Seção de Acolhimento */}
      <section id="sobre" className="py-20 section-alternada-verde-rosa">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Aqui sua voz é ouvida. Sua história importa. Seu futuro é prioridade.
          </h2>
          
          <p className="text-lg text-secondary max-w-4xl mx-auto leading-relaxed">
            O Bem no Trabalho é um espaço seguro, sigiloso e humanizado. 
            Criado para que nenhuma mulher enfrente sozinha a discriminação ou a violência no trabalho. 
            Acolhemos, orientamos e fortalecemos mulheres para que possam retomar suas trajetórias 
            profissionais com dignidade.
          </p>
        </div>
      </section>

      {/* O Problema e Nossa Missão */}
      <section className="py-20 section-alternada-rosa">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Por que o Bem no Trabalho é necessário?</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-primary mb-4 flex items-center">
                  <Target className="w-6 h-6 mr-2 icon-verde" />
                  O Problema
                </h3>
                <p className="text-secondary leading-relaxed">
                  Milhares de mulheres ainda sofrem assédio moral, assédio sexual, desigualdade salarial 
                  e discriminação de gênero em seus locais de trabalho. Muitas não denunciam por medo, 
                  falta de apoio ou desconhecimento de seus direitos. É hora de mudar esse cenário.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-primary mb-4 flex items-center">
                <Eye className="w-6 h-6 mr-2 icon-verde" />
                Nossa Missão
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold text-primary">Missão:</p>
                    <p className="text-secondary">Acolher, apoiar e empoderar mulheres vítimas de violência e discriminação no ambiente profissional.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold text-primary">Visão:</p>
                    <p className="text-secondary">Tornar-se referência nacional em proteção, acolhimento e reinserção profissional.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold text-primary">Valores:</p>
                    <p className="text-secondary">Acolhimento, empatia, justiça, dignidade, igualdade de oportunidades.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O que oferecemos */}
      <section id="servicos" className="py-20 section-bg-rosa">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            O que oferecemos
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="service-card interactive-element">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-primary">Aconselhamento Profissional</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-secondary text-center mb-4">
                  Aconselhamento psicológico e jurídico em parceria com profissionais qualificados.
                </CardDescription>
                <Button variant="outline" className="w-full btn-secondary" onClick={() => scrollToSection('profissionais')}>
                  Ver Profissionais
                </Button>
              </CardContent>
            </Card>

            <Card className="service-card interactive-element">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-pink-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-primary">Fórum de Apoio</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-secondary text-center mb-4">
                  Espaço seguro para compartilhar experiências e receber apoio da comunidade.
                </CardDescription>
                <Button variant="outline" className="w-full btn-secondary" onClick={() => scrollToSection('forum')}>
                  Acessar Fórum
                </Button>
              </CardContent>
            </Card>

            <Card className="service-card interactive-element">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-primary">Reinserção Profissional</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-secondary text-center mb-4">
                  Espaço de reinserção profissional: mentorias, capacitação e oportunidades.
                </CardDescription>
                <Button variant="outline" className="w-full btn-secondary" onClick={() => scrollToSection('contato')}>
                  Saiba Mais
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nossos Profissionais */}
      <section id="profissionais" className="py-20 section-alternada-verde-rosa">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            Nossos Profissionais
          </h2>
          <p className="text-center text-secondary mb-12 max-w-2xl mx-auto">
            Conheça nossa equipe de profissionais qualificados prontos para ajudar
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {profissionais.map((prof) => (
              <Card key={prof.id} className="service-card interactive-element">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                      <UserPlus className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-primary">{prof.nome}</CardTitle>
                      <Badge variant="secondary" className="badge-rosa">
                        {prof.especialidade}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-secondary">{prof.avaliacao}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-secondary mb-4">
                    {prof.descricao}
                  </CardDescription>
                  <div className="space-y-2 text-sm text-secondary">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 icon-verde" />
                      <span>{prof.localizacao}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 icon-verde" />
                      <span>{prof.telefone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 icon-verde" />
                      <span>{prof.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button className="btn-primary" onClick={() => setShowProfessionalForm(true)}>
              <UserPlus className="w-5 h-5 mr-2" />
              Cadastrar Novo Profissional
            </Button>
          </div>

          {/* Formulário de Cadastro de Profissional */}
          {showProfessionalForm && (
            <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50 p-4">
              <div className="modal-content rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-primary">Cadastrar Profissional</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowProfessionalForm(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nome-prof" className="text-primary">Nome Completo *</Label>
                    <Input
                      id="nome-prof"
                      value={formData.novoProfissional.nome}
                      onChange={(e) => handleInputChange('novoProfissional', 'nome', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email-prof" className="text-primary">E-mail *</Label>
                    <Input
                      id="email-prof"
                      type="email"
                      value={formData.novoProfissional.email}
                      onChange={(e) => handleInputChange('novoProfissional', 'email', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="telefone-prof" className="text-primary">Telefone</Label>
                    <Input
                      id="telefone-prof"
                      value={formData.novoProfissional.telefone}
                      onChange={(e) => handleInputChange('novoProfissional', 'telefone', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="especialidade-prof" className="text-primary">Especialidade *</Label>
                    <Input
                      id="especialidade-prof"
                      value={formData.novoProfissional.especialidade}
                      onChange={(e) => handleInputChange('novoProfissional', 'especialidade', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="descricao-prof" className="text-primary">Descrição</Label>
                    <Textarea
                      id="descricao-prof"
                      value={formData.novoProfissional.descricao}
                      onChange={(e) => handleInputChange('novoProfissional', 'descricao', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="localizacao-prof" className="text-primary">Localização</Label>
                    <Input
                      id="localizacao-prof"
                      value={formData.novoProfissional.localizacao}
                      onChange={(e) => handleInputChange('novoProfissional', 'localizacao', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1" onClick={() => setShowProfessionalForm(false)}>
                      Cancelar
                    </Button>
                    <Button className="flex-1 btn-primary" onClick={handleAddProfessional}>
                      Cadastrar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Fórum de Apoio */}
      <section id="forum" className="py-20 section-alternada-rosa">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            Fórum de Apoio
          </h2>
          <p className="text-center text-secondary mb-12 max-w-2xl mx-auto">
            Compartilhe experiências e receba apoio da nossa comunidade
          </p>

          {/* Seção de Frases Motivacionais */}
          <div className="mb-12 text-center">
            <div className="bg-gradient-to-r from-pink-100 to-green-100 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
              <blockquote className="text-lg md:text-xl italic text-primary mb-4 font-medium">
                "{frasesMotivacionais[fraseAtual].frase}"
              </blockquote>
              <cite className="text-secondary font-semibold">
                — {frasesMotivacionais[fraseAtual].autora}
              </cite>
              <div className="flex justify-center mt-4 space-x-2">
                {frasesMotivacionais.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setFraseAtual(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === fraseAtual ? 'bg-green-600' : 'bg-pink-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-1 gap-8 mb-8">
            {posts.map((post, index) => (
              <Card 
                key={post.id} 
                className="service-card interactive-element transform transition-all duration-500 hover:scale-[1.02]"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <CardHeader>
                  <CardTitle className="text-primary">{post.titulo}</CardTitle>
                  <div className="flex items-center justify-between text-sm text-secondary">
                    <span>Por {post.autor}</span>
                    <span>{post.data}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-secondary mb-4">
                    {expandedPost === post.id ? (post.conteudoCompleto || post.resumo) : post.resumo}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4 icon-verde" />
                      <span className="text-sm text-secondary">{post.respostas || 0} respostas</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="btn-secondary transition-all duration-300"
                        onClick={() => toggleExpandPost(post.id)}
                      >
                        {expandedPost === post.id ? 'Recolher' : 'Ler mais'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="btn-secondary transition-all duration-300"
                        onClick={() => setShowResponseForm(showResponseForm === post.id ? null : post.id)}
                      >
                        Responder
                      </Button>
                    </div>
                  </div>

                  {/* Respostas */}
                  {expandedPost === post.id && post.respostasLista && post.respostasLista.length > 0 && (
                    <div className="mt-4 space-y-3 border-t pt-4">
                      <h4 className="font-semibold text-primary text-sm">Respostas:</h4>
                      {post.respostasLista.map((resposta) => (
                        <div 
                          key={resposta.id} 
                          className="bg-gradient-to-r from-pink-50 to-green-50 p-3 rounded-lg border-l-4 border-green-500 transform transition-all duration-300 hover:shadow-md"
                        >
                          <p className="text-secondary text-sm mb-2">{resposta.texto}</p>
                          <div className="flex justify-between text-xs text-secondary">
                            <span>Por {resposta.autor}</span>
                            <span>{resposta.data}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Formulário de Resposta */}
                  {showResponseForm === post.id && (
                    <div className="mt-4 space-y-3 border-t pt-4 animate-fadeIn">
                      <Label htmlFor={`resposta-${post.id}`} className="text-primary text-sm">
                        Sua resposta:
                      </Label>
                      <Textarea
                        id={`resposta-${post.id}`}
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        className="form-control min-h-[80px]"
                        placeholder="Escreva sua resposta..."
                      />
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setShowResponseForm(null)}
                          className="transition-all duration-300"
                        >
                          Cancelar
                        </Button>
                        <Button 
                          size="sm" 
                          className="btn-primary transition-all duration-300"
                          onClick={() => handleAddResponse(post.id)}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Enviar
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center space-x-4">
            <Button className="btn-primary" onClick={() => setShowForumPost(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Criar Post
            </Button>
          </div>

          {/* Formulário de Novo Post */}
          {showForumPost && (
            <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50 p-4">
              <div className="modal-content rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-primary">Criar Novo Post</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowForumPost(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="titulo-post" className="text-primary">Título *</Label>
                    <Input
                      id="titulo-post"
                      value={formData.novoPost.titulo}
                      onChange={(e) => handleInputChange('novoPost', 'titulo', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="autor-post" className="text-primary">Seu Nome *</Label>
                    <Input
                      id="autor-post"
                      value={formData.novoPost.autor}
                      onChange={(e) => handleInputChange('novoPost', 'autor', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="conteudo-post" className="text-primary">Conteúdo *</Label>
                    <Textarea
                      id="conteudo-post"
                      value={formData.novoPost.conteudo}
                      onChange={(e) => handleInputChange('novoPost', 'conteudo', e.target.value)}
                      className="form-control min-h-[120px]"
                      placeholder="Compartilhe sua experiência ou dúvida..."
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1" onClick={() => setShowForumPost(false)}>
                      Cancelar
                    </Button>
                    <Button className="flex-1 btn-primary" onClick={handleAddPost}>
                      <Send className="w-4 h-4 mr-2" />
                      Publicar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Proposta de Valor e ODS */}
      <section className="py-20 section-bg-rosa">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Não é apenas uma plataforma. É um movimento por um ambiente de trabalho mais justo e humano.
          </h2>
          
          <p className="text-xl text-secondary mb-12 max-w-4xl mx-auto">
            O Bem no Trabalho une tecnologia e empatia para transformar dor em força, 
            silêncio em voz e medo em ação.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex flex-col items-center interactive-element">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-600 to-pink-700 rounded-full flex items-center justify-center mb-4">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-semibold text-primary">ODS 5</h3>
              <p className="text-sm text-secondary">Igualdade de Gênero</p>
            </div>
            
            <div className="flex flex-col items-center interactive-element">
              <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-semibold text-primary">ODS 8</h3>
              <p className="text-sm text-secondary">Trabalho Decente</p>
            </div>
            
            <div className="flex flex-col items-center interactive-element">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-600 to-pink-700 rounded-full flex items-center justify-center mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-semibold text-primary">ODS 10</h3>
              <p className="text-sm text-secondary">Redução das Desigualdades</p>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 section-alternada-verde-rosa">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            O que dizem sobre nós
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="testimonial-card interactive-element">
              <CardContent className="pt-6">
                <p className="text-secondary italic mb-4">
                  "Encontrei apoio e orientação para seguir em frente."
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-pink-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">A</span>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Ana, 22 anos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="testimonial-card interactive-element">
              <CardContent className="pt-6">
                <p className="text-secondary italic mb-4">
                  "Aqui me senti acolhida e segura para compartilhar minha experiência."
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">M</span>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Marina, 32 anos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Principal */}
      <section id="contato" className="py-20 section-alternada-rosa">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            Junte-se a nós no Bem no Trabalho
          </h2>
          <p className="text-center text-secondary mb-12 max-w-2xl mx-auto">
            Seja parte desta rede de apoio e transformação.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Formulário Quero Participar */}
            <div className="form-section">
              <h3 className="text-2xl font-bold text-primary mb-6 text-center">
                Quero Participar
              </h3>
              <p className="text-secondary text-center mb-6">
                Cadastre-se para receber apoio e fazer parte da comunidade
              </p>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nome-participar" className="text-primary">Nome Completo *</Label>
                  <Input
                    id="nome-participar"
                    value={formData.participar.nome}
                    onChange={(e) => handleInputChange('participar', 'nome', e.target.value)}
                    className="form-control"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email-participar" className="text-primary">E-mail *</Label>
                  <Input
                    id="email-participar"
                    type="email"
                    value={formData.participar.email}
                    onChange={(e) => handleInputChange('participar', 'email', e.target.value)}
                    className="form-control"
                  />
                </div>
                
                <div>
                  <Label htmlFor="telefone-participar" className="text-primary">Telefone *</Label>
                  <Input
                    id="telefone-participar"
                    value={formData.participar.telefone}
                    onChange={(e) => handleInputChange('participar', 'telefone', e.target.value)}
                    className="form-control"
                  />
                </div>
                
                <div>
                  <Label htmlFor="endereco-participar" className="text-primary">Endereço Completo</Label>
                  <Input
                    id="endereco-participar"
                    value={formData.participar.endereco}
                    onChange={(e) => handleInputChange('participar', 'endereco', e.target.value)}
                    className="form-control"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="idade-participar" className="text-primary">Idade</Label>
                    <Input
                      id="idade-participar"
                      value={formData.participar.idade}
                      onChange={(e) => handleInputChange('participar', 'idade', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="escolaridade-participar" className="text-primary">Escolaridade</Label>
                    <Input
                      id="escolaridade-participar"
                      value={formData.participar.escolaridade}
                      onChange={(e) => handleInputChange('participar', 'escolaridade', e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cargo-participar" className="text-primary">Cargo</Label>
                    <Input
                      id="cargo-participar"
                      value={formData.participar.cargo}
                      onChange={(e) => handleInputChange('participar', 'cargo', e.target.value)}
                      className="form-control"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="empresa-participar" className="text-primary">Empresa</Label>
                    <Input
                      id="empresa-participar"
                      value={formData.participar.empresa}
                      onChange={(e) => handleInputChange('participar', 'empresa', e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="nickname-participar" className="text-primary">Nickname</Label>
                  <Input
                    id="nickname-participar"
                    value={formData.participar.nickname}
                    onChange={(e) => handleInputChange('participar', 'nickname', e.target.value)}
                    className="form-control"
                  />
                </div>
                
                <Button 
                  className="w-full btn-primary"
                  onClick={() => handleSubmit('participar')}
                >
                  Quero participar
                </Button>
              </div>
            </div>

            {/* Formulário Quero Apoiar */}
            <div className="form-section">
              <h3 className="text-2xl font-bold text-primary mb-6 text-center">
                Quero Apoiar
              </h3>
              <p className="text-secondary text-center mb-6">
                Seja uma profissional parceira ou voluntária
              </p>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nome-apoiar" className="text-primary">Nome Completo *</Label>
                  <Input
                    id="nome-apoiar"
                    value={formData.apoiar.nome}
                    onChange={(e) => handleInputChange('apoiar', 'nome', e.target.value)}
                    className="form-control"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email-apoiar" className="text-primary">E-mail *</Label>
                  <Input
                    id="email-apoiar"
                    type="email"
                    value={formData.apoiar.email}
                    onChange={(e) => handleInputChange('apoiar', 'email', e.target.value)}
                    className="form-control"
                  />
                </div>
                
                <div>
                  <Label htmlFor="telefone-apoiar" className="text-primary">Telefone</Label>
                  <Input
                    id="telefone-apoiar"
                    value={formData.apoiar.telefone}
                    onChange={(e) => handleInputChange('apoiar', 'telefone', e.target.value)}
                    className="form-control"
                  />
                </div>
                
                <div>
                  <Label htmlFor="especialidade-apoiar" className="text-primary">Área de Especialidade *</Label>
                  <Input
                    id="especialidade-apoiar"
                    value={formData.apoiar.especialidade}
                    onChange={(e) => handleInputChange('apoiar', 'especialidade', e.target.value)}
                    className="form-control"
                  />
                </div>
                
                <div>
                  <Label htmlFor="mensagem-apoiar" className="text-primary">Mensagem</Label>
                  <Textarea
                    id="mensagem-apoiar"
                    value={formData.apoiar.mensagem}
                    onChange={(e) => handleInputChange('apoiar', 'mensagem', e.target.value)}
                    className="form-control min-h-[100px]"
                    placeholder="Conte-nos como você gostaria de contribuir..."
                  />
                </div>
                
                <Button 
                  className="w-full btn-primary"
                  onClick={() => handleSubmit('apoiar')}
                >
                  Quero apoiar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="footer py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="/logo-bem-no-trabalho.jpeg" 
                  alt="Bem no Trabalho Logo" 
                  className="w-10 h-10 rounded-full object-cover logo-bem-trabalho"
                />
                <span className="text-xl font-bold text-white">Bem no Trabalho</span>
              </div>
              <p className="text-green-100 mb-4">
                Acolhimento e apoio para mulheres no ambiente profissional.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Links Úteis</h4>
              <ul className="space-y-2 text-green-100">
                <li><button onClick={() => scrollToSection('sobre')} className="hover:text-white transition-smooth">Sobre</button></li>
                <li><button onClick={() => scrollToSection('servicos')} className="hover:text-white transition-smooth">Serviços</button></li>
                <li><button onClick={() => scrollToSection('profissionais')} className="hover:text-white transition-smooth">Profissionais</button></li>
                <li><button onClick={() => scrollToSection('forum')} className="hover:text-white transition-smooth">Fórum</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contato</h4>
              <ul className="space-y-2 text-green-100">
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>contato@bemnotrabalho.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>(11) 99999-9999</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Apoio</h4>
              <p className="text-green-100 text-sm">
                Em parceria com PUC Minas e em conformidade com a Convenção 190 da OIT.
              </p>
            </div>
          </div>
          
          <div className="border-t border-green-600 mt-8 pt-8 text-center">
            <p className="text-green-100">
              © 2024 Bem no Trabalho. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

