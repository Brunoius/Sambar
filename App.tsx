import React, { useState } from 'react';
import {
  Instagram,
  Facebook,
  Twitter,
  Phone,
  Calendar,
  MapPin,
  User,
  Glasses as Glass,
  Tag,
  Send,
  Plus,
  Check,
} from 'lucide-react';

const cocktails = [
  {
    name: 'Tequila Sunrise',
    image: 'Sunrise.jpg',
  },
  {
    name: 'Pisco Sour',
    image: 'Pisco sour.jpg',
  },
  {
    name: 'Piña Colada',
    image: 'Piña colada.jpg',
  },
  {
    name: 'Daiquiri',
    image: 'Daiquiri.jpg',
  },
  {
    name: 'Caipirinha',
    image: 'Caipirinha.jpg',
  },
  {
    name: 'Otro',
    image: 'Bar.jpg',
  },
];

const testimonials = [
  {
    name: 'Isabella Martinez',
    text: 'Sambar elevó mi evento corporativo a otro nivel. El servicio y la presentación fueron impecables.',
    image: 'https://images.unsplash.com/photo-1485893086445-ed75865251e0?q=80',
  },
  {
    name: 'Carlos Rodriguez',
    text: 'La atención al detalle y profesionalismo de Sambar hicieron de mi boda un evento inolvidable.',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80',
  },
];

function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    cocktails: '',
    date: '',
    location: '',
    eventName: '',
    customCocktail: '',
  });

  const [selectedCocktails, setSelectedCocktails] = useState<string[]>([]);
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleCocktailSelect = (cocktailName: string) => {
    if (cocktailName === 'Otro') {
      setShowCustomInput(true);
      return;
    }

    setSelectedCocktails((prev) => {
      if (prev.includes(cocktailName)) {
        return prev.filter((name) => name !== cocktailName);
      }
      return [...prev, cocktailName];
    });
  };

  const handleCustomCocktailSubmit = () => {
    if (formData.customCocktail.trim()) {
      setSelectedCocktails((prev) => [...prev, formData.customCocktail]);
      setFormData((prev) => ({ ...prev, customCocktail: '' }));
      setShowCustomInput(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Nuevo evento:%0A
      Nombre: ${formData.name}%0A
      Teléfono: ${formData.phone}%0A
      Cócteles Seleccionados: ${selectedCocktails.join(', ')}%0A
      Número de Cócteles: ${formData.cocktails}%0A
      Fecha: ${formData.date}%0A
      Ubicación: ${formData.location}%0A
      Evento: ${formData.eventName}`;
    window.open(`https://wa.me/1234567890?text=${message}`);
  };

  return (
    <div className="min-h-screen bg-[#1a2f2f] text-white">
      {/* Header */}
      <header className="py-6 px-4 bg-[#1a2f2f] fixed w-full z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <img
            src="Blanco.png"
            alt="Sambar Logo"
            className="w-16 h-16 object-contain"
          />
          <h1 className="text-4xl md:text-5xl text-center font-['Bebas_Neue'] tracking-wider text-[#c5a572]">
            SAMBAR
          </h1>
          <div className="w-16"></div> {/* Spacer for balance */}
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="h-screen flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1670366183783-daedd774e52a?q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            ¡Tu fiesta, nuestra mezcla perfecta!
          </h2>
          <p className="text-xl md:text-2xl text-[#c5a572]">
            Flair bartender privado para tus eventos exclusivos
          </p>
        </div>
      </section>

      {/* Cocktails Section */}
      <section className="py-20 px-4 bg-[#243c3c]">
        <h2 className="text-3xl md:text-4xl text-center mb-12 text-[#c5a572]">
          Selecciona tus Cócteles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cocktails.map((cocktail) => (
            <div
              key={cocktail.name}
              onClick={() => handleCocktailSelect(cocktail.name)}
              className={`relative h-64 group overflow-hidden rounded-lg transition-all duration-300 cursor-pointer
                ${
                  selectedCocktails.includes(cocktail.name)
                    ? 'ring-4 ring-[#c5a572]'
                    : ''
                }`}
            >
              <img
                src={cocktail.image}
                alt={cocktail.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 ${
                  selectedCocktails.includes(cocktail.name)
                    ? 'bg-black/60'
                    : 'bg-black/40 group-hover:bg-black/60'
                } transition-colors duration-300`}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold mb-2">
                    {cocktail.name}
                  </h3>
                  {selectedCocktails.includes(cocktail.name) ? (
                    <Check className="mx-auto text-[#c5a572]" size={24} />
                  ) : cocktail.name === 'Otro' ? (
                    <Plus className="mx-auto text-[#c5a572]" size={24} />
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Cocktail Input */}
        {showCustomInput && (
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Escribe el nombre del cóctel"
                className="flex-1 bg-[#1a2f2f] rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#c5a572]"
                value={formData.customCocktail}
                onChange={(e) =>
                  setFormData({ ...formData, customCocktail: e.target.value })
                }
              />
              <button
                onClick={handleCustomCocktailSubmit}
                className="bg-[#c5a572] text-[#1a2f2f] px-4 rounded-lg font-semibold hover:bg-[#b39461] transition-colors duration-300"
              >
                Añadir
              </button>
            </div>
          </div>
        )}

        {/* Selected Cocktails */}
        {selectedCocktails.length > 0 && (
          <div className="mt-8 max-w-2xl mx-auto">
            <h3 className="text-xl text-center mb-4 text-[#c5a572]">
              Cócteles Seleccionados:
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {selectedCocktails.map((cocktail) => (
                <span
                  key={cocktail}
                  className="bg-[#c5a572] text-[#1a2f2f] px-4 py-2 rounded-full font-medium"
                >
                  {cocktail}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4 bg-[#1a2f2f]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-12 text-[#c5a572]">
            Reserva tu Evento
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c5a572]"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full bg-[#243c3c] rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-[#c5a572]"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c5a572]"
                    size={20}
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    className="w-full bg-[#243c3c] rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-[#c5a572]"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="relative">
                  <Glass
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c5a572]"
                    size={20}
                  />
                  <input
                    type="number"
                    placeholder="Número de Cócteles"
                    className="w-full bg-[#243c3c] rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-[#c5a572]"
                    value={formData.cocktails}
                    onChange={(e) =>
                      setFormData({ ...formData, cocktails: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c5a572]"
                    size={20}
                  />
                  <input
                    type="date"
                    className="w-full bg-[#243c3c] rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-[#c5a572]"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c5a572]"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Ubicación del Evento"
                    className="w-full bg-[#243c3c] rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-[#c5a572]"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <Tag
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c5a572]"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Nombre del Evento"
                    className="w-full bg-[#243c3c] rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-[#c5a572]"
                    value={formData.eventName}
                    onChange={(e) =>
                      setFormData({ ...formData, eventName: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#c5a572] text-[#1a2f2f] py-3 rounded-lg font-semibold hover:bg-[#b39461] transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Send size={20} />
              Enviar por WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-[#243c3c]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-8 text-[#c5a572]">
            Sobre Nosotros
          </h2>
          <p className="text-lg leading-relaxed mb-12">
            En Sambar, nos especializamos en crear experiencias únicas a través
            de la mixología de alta gama. Con más de una década de experiencia
            en eventos exclusivos, nuestro equipo de bartenders expertos combina
            técnicas de flair con un servicio impecable para hacer de cada
            ocasión un momento inolvidable.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-[#1a2f2f]">
        <h2 className="text-3xl md:text-4xl text-center mb-12 text-[#c5a572]">
          Lo que dicen nuestros clientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-[#243c3c] p-6 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
              </div>
              <p className="text-gray-300">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-[#1a2f2f] border-t border-[#c5a572]/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-8 mb-8">
            <a
              href="https://www.instagram.com/sambar.cocktails/"
              className="text-[#c5a572] hover:text-[#b39461] transition-colors duration-300"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://x.com/Sambarcocktails"
              className="text-[#c5a572] hover:text-[#b39461] transition-colors duration-300"
            >
              <Facebook size={24} />
            </a>
            <a
              href="#"
              className="text-[#c5a572] hover:text-[#b39461] transition-colors duration-300"
            >
              <Twitter size={24} />
            </a>
          </div>
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Sambar. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
