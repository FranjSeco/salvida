export const themes = {
  salvida: {
    colors: {
      primary: '#1E88E5',
      secondary: '#F4511E',
      accent: '#8E24AA',
      neutral: '#424242',
      background: '#FFFFFF',
      foreground: '#212121'
    }
  }
};

export function applyTheme(theme = themes.salvida) {
  const root = document.documentElement;
  Object.entries(theme.colors).forEach(([token, value]) => {
    root.style.setProperty(`--color-${token}`, value);
  });
}
