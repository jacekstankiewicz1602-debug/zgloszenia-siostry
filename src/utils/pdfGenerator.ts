import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { type FormValues } from '../types';

export const generateRegistrationPDF = async (data: FormValues) => {
  // Create a temporary container
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.width = '800px';
  container.style.backgroundColor = '#ffffff';
  container.style.color = '#000000';
  container.style.padding = '40px';
  container.style.fontFamily = 'serif';
  
  // Format the date
  const date = new Date(data.createdAt || Date.now());
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  container.innerHTML = `
    <h1 style="text-align: center; color: #a38040; margin-bottom: 2rem;">Karta Zgłoszeniowa - Narnia</h1>
    <div style="margin-bottom: 1rem;"><strong style="color: #666;">ID Zgłoszenia:</strong> ${data.id || '-'}</div>
    <div style="margin-bottom: 2rem;"><strong style="color: #666;">Data Rejestracji:</strong> ${formattedDate}</div>
    
    <h2 style="color: #a38040; border-bottom: 1px solid #eee; padding-bottom: 0.5rem; margin-top: 1.5rem;">Dane Kontaktowe</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 1rem;">
      <tr><td style="padding: 0.5rem 0; width: 40%; border-bottom: 1px solid #f5f5f5;"><strong>Telefon Uczestnika:</strong></td><td style="border-bottom: 1px solid #f5f5f5;">${data.participantPhone || '-'}</td></tr>
      <tr><td style="padding: 0.5rem 0; border-bottom: 1px solid #f5f5f5;"><strong>Telefon Rodzica:</strong></td><td style="border-bottom: 1px solid #f5f5f5;">${data.parentPhone || '-'}</td></tr>
      <tr><td style="padding: 0.5rem 0; border-bottom: 1px solid #f5f5f5;"><strong>Numer Alarmowy:</strong></td><td style="border-bottom: 1px solid #f5f5f5;">${data.emergencyPhone || '-'} (Osoba: ${data.emergencyName || '-'})</td></tr>
      <tr><td style="padding: 0.5rem 0; border-bottom: 1px solid #f5f5f5;"><strong>Email:</strong></td><td style="border-bottom: 1px solid #f5f5f5;">${data.email || '-'}</td></tr>
      <tr><td style="padding: 0.5rem 0; border-bottom: 1px solid #f5f5f5;"><strong>Adres:</strong></td><td style="border-bottom: 1px solid #f5f5f5;">${data.address || '-'}</td></tr>
    </table>

    <h2 style="color: #a38040; border-bottom: 1px solid #eee; padding-bottom: 0.5rem; margin-top: 1.5rem;">Zdrowie i Bezpieczeństwo</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 1rem;">
      <tr><td style="padding: 0.5rem 0; width: 40%; border-bottom: 1px solid #f5f5f5;"><strong>Choroby Przewlekłe:</strong></td><td style="border-bottom: 1px solid #f5f5f5;">${data.hasChronicConditions ? 'Tak' : 'Nie'}</td></tr>
      <tr><td style="padding: 0.5rem 0; border-bottom: 1px solid #f5f5f5;"><strong>Alergie:</strong></td><td style="border-bottom: 1px solid #f5f5f5;">${data.hasAllergies ? 'Tak' : 'Nie'}</td></tr>
      <tr><td style="padding: 0.5rem 0; border-bottom: 1px solid #f5f5f5;"><strong>Leki Spożywane Na Stałe:</strong></td><td style="border-bottom: 1px solid #f5f5f5;">${data.takesMedication ? 'Tak' : 'Nie'}</td></tr>
      <tr><td style="padding: 0.5rem 0; border-bottom: 1px solid #f5f5f5;"><strong>Specjalne Wymagania:</strong></td><td style="border-bottom: 1px solid #f5f5f5;">${data.specialNeeds || 'Brak'}</td></tr>
      <tr><td style="padding: 0.5rem 0; border-bottom: 1px solid #f5f5f5;"><strong>Opcja Dietetyczna:</strong></td><td style="border-bottom: 1px solid #f5f5f5;">${data.diet || '-'}</td></tr>
      ${data.dietDetails ? `<tr><td style="padding: 0.5rem 0; border-bottom: 1px solid #f5f5f5;"><strong>Szczegóły Diety:</strong></td><td style="border-bottom: 1px solid #f5f5f5;">${data.dietDetails}</td></tr>` : ''}
    </table>

    <h2 style="color: #a38040; border-bottom: 1px solid #eee; padding-bottom: 0.5rem; margin-top: 1.5rem;">Informacje Dodatkowe</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 1rem;">
      <tr><td style="padding: 0.5rem 0; width: 40%; border-bottom: 1px solid #f5f5f5;"><strong>Dlaczego chce uczestniczyć:</strong></td><td style="border-bottom: 1px solid #f5f5f5;">${data.reasonToAttend}</td></tr>
      <tr><td style="padding: 0.5rem 0; width: 40%; border-bottom: 1px solid #f5f5f5;"><strong>Rozmiar Koszulki:</strong></td><td style="border-bottom: 1px solid #f5f5f5;">${data.tShirtSize || '-'}</td></tr>
      <tr><td style="padding: 0.5rem 0; border-bottom: 1px solid #f5f5f5;"><strong>Był(a) Już Na Obozie:</strong></td><td style="border-bottom: 1px solid #f5f5f5;">${data.campExperience ? 'Tak' : 'Nie'}</td></tr>
      <tr><td style="padding: 0.5rem 0; border-bottom: 1px solid #f5f5f5;"><strong>Dodatkowe Uwagi:</strong></td><td style="border-bottom: 1px solid #f5f5f5;">${data.notes || 'Brak'}</td></tr>
    </table>

    <h2 style="color: #a38040; border-bottom: 1px solid #eee; padding-bottom: 0.5rem; margin-top: 1.5rem;">Zgody i Pozwolenia</h2>
    <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
      <li style="padding: 0.25rem 0;">Zgoda na leczenie i zabiegi medyczne: <strong>${data.consentMedical ? 'Tak' : 'Nie'}</strong></li>
      <li style="padding: 0.25rem 0;">Zgoda na rozpowszechnianie wizerunku: <strong>${data.consentPhotos ? 'Tak' : 'Nie'}</strong></li>
      <li style="padding: 0.25rem 0;">Zgoda na zajęcia m.in. na wodzie: <strong>${data.consentActivities ? 'Tak' : 'Nie'}</strong></li>
    </ul>
    
    <div style="margin-top: 4rem; text-align: center; color: #999; font-size: 0.8rem; border-top: 1px solid #eee; padding-top: 1rem;">
      Wygenerowano automatycznie z systemu zgłoszeń Narnia
    </div>
  `;

  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Zgloszenie_Narnia_${data.participantPhone || 'Brak'}.pdf`);
  } catch (error) {
    console.error('Błąd podczas generowania PDF:', error);
    alert('Wystąpił błąd podczas generowania pliku PDF.');
  } finally {
    document.body.removeChild(container);
  }
};
