import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface ServiceOption {
  name: string;
  price: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  badge?: string;
  popular?: boolean;
}

const serviceOptions: ServiceOption[] = [
  {
    name: "Аранжировка под ключ",
    price: "от 3 000 ₽",
    icon: <Icon name="Star" size={24} />,
    description: "По вашей версии СУНО — за 3 дня",
    features: [
      "Живая аранжировка по наброску СУНО",
      "Все инструменты расставлены вручную",
      "Структура трека: куплет, припев, бридж",
      "Файл в высоком качестве (WAV/MP3)",
      "1 раунд правок включён",
      "Срок: 3 рабочих дня",
    ],
    badge: "ГЛАВНАЯ УСЛУГА",
    popular: true,
  },
  {
    name: "Сведение и мастеринг",
    price: "от 1 500 ₽",
    icon: <Icon name="AudioWaveform" size={24} />,
    description: "Профессиональный звук для любой платформы",
    features: [
      "Сведение всех дорожек",
      "Мастеринг под стриминги",
      "Нормализация громкости",
      "Подходит для Spotify, Apple Music, YouTube",
      "Файл в WAV и MP3",
    ],
  },
  {
    name: "Тексты на заказ",
    price: "от 1 000 ₽",
    icon: <Icon name="Pen" size={24} />,
    description: "Слова, которые попадают в сердце",
    features: [
      "Текст под ваш жанр и стиль",
      "Куплет + припев + бридж",
      "Учёт смыслового посыла",
      "Подача рифм под ритм трека",
      "1 раунд правок включён",
    ],
  },
  {
    name: "Музыка под ключ",
    price: "от 6 000 ₽",
    icon: <Icon name="Crown" size={24} />,
    description: "Полный цикл: текст + аранжировка + мастеринг",
    features: [
      "Разработка концепции трека",
      "Текст + аранжировка с нуля",
      "Сведение и мастеринг",
      "Готово к публикации",
      "2 раунда правок",
      "Срок: 5–7 рабочих дней",
    ],
  },
];

const LicenseSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="services" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black"></div>

      <div className="container mx-auto px-4 relative">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">Услуги и цены</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Выбери нужную услугу — и я превращу твою идею в профессиональный трек
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceOptions.map((option, index) => (
            <div
              key={option.name}
              className={`transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card
                className={`relative h-full bg-black border-white/10 ${
                  hoveredCard === index ? "scale-105" : "scale-100"
                } transition-all duration-300`}
              >
                <div className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-br from-white/20 to-white/0">
                  <div className="absolute inset-0 rounded-lg bg-black"></div>
                </div>

                {option.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold animate-pulse">
                      Популярная
                    </span>
                  </div>
                )}

                <CardContent className="relative p-6 rounded-lg h-full flex flex-col">
                  <div className="text-center mb-6">
                    <div className="inline-flex p-3 rounded-full bg-zinc-900 border border-white/10 mb-4">
                      {option.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-1 text-white">{option.name}</h3>
                    <p className="text-sm text-zinc-500 mb-3">{option.description}</p>
                    <div className="text-3xl font-bold text-white">{option.price}</div>
                  </div>

                  <div className="flex-grow">
                    <ul className="space-y-3 mb-6">
                      {option.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Icon name="Check" size={18} className="text-white mr-2 shrink-0 mt-0.5" />
                          <span className="text-sm text-zinc-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {option.badge && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-white bg-white/5 py-2 px-3 rounded-lg border border-white/10 text-center">
                        {option.badge}
                      </p>
                    </div>
                  )}

                  <Button
                    className="w-full bg-white text-black hover:bg-zinc-200 transition-colors"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Заказать
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LicenseSection;
