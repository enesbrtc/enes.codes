export const instructions = {
  title: "Enes Barutcu — Cyberpunk CV Preview",
  locale: "tr",
  description:
    "Enes Barutcu için cyberpunk temalı RPG karakter önizlemeli CV yönergeleri ve örnek prompt.",
  template: {
    namePlaceholder: "Enes Barutcu",
    rolePlaceholder: "Full-Stack Developer / Netrunner",
    taglinePlaceholder: "Coding, Problem Solving, Vibecoding",
  },
  prompt: `Türkçe: Enes Barutcu için cyberpunk RPG karakter kartı oluştur. Çıktı JSON benzeri, frontend bileşenine kolayca bağlanabilecek şekilde olmalı.
Kullanılacak alanlar:
- name: karakter takma adı
- role: sınıf/rol
- tagline: kısa cümle (1 satır)
- skills: data/skills.ts içindeki yetenekleri kullanarak isim ve level gösterimi
- stats: {int, ref, tech, cool, emp} tarzı kısa nitelikler (0-100 arası)
- cyberware: 2-4 öğe kısa liste
- backstory: 2-3 cümlelik arka plan
- contact: handle veya node adresi (örn. @neon_ghost)

Stil: Neon, sert kontrast, kısa net cümleler, teknik terimler ve sokak argosu karışımı. JSON çıktısında tüm alanlar dolu olsun.
`,
  renderHints: {
    colorScheme: "neon-magenta-cyan",
    showProgressBarsForSkills: true,
    maxSkillLevel: 100,
    emphasizeTopSkills: 3,
  },
};

export default instructions;
