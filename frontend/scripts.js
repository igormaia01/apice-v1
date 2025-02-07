const apiUrl = 'http://localhost:3000'; // Substituir pela URL real da API

document.addEventListener('DOMContentLoaded', async () => {
  createTooltip();
  await loadStudents();

  document
    .getElementById('student-selector')
    .addEventListener('change', async (e) => {
      const studentId = e.target.value;
      if (studentId) {
        await loginAndFetchData(studentId);
      }
    });
});

function createTooltip() {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  document.body.appendChild(tooltip);

  document.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('day')) {
      tooltip.textContent = e.target.title;
      tooltip.style.opacity = 1;
      tooltip.style.left = `${e.pageX + 10}px`;
      tooltip.style.top = `${e.pageY + 10}px`;
    }
  });

  document.addEventListener('mousemove', (e) => {
    tooltip.style.left = `${e.pageX + 10}px`;
    tooltip.style.top = `${e.pageY + 10}px`;
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('day')) {
      tooltip.style.opacity = 0;
    }
  });

  return tooltip;
}

async function loadStudents() {
  try {
    const token = await login();

    const response = await fetch(`${apiUrl}/student`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error('Erro ao buscar estudantes.');
    }
    const students = await response.json();
    const studentSelector = document.getElementById('student-selector');

    students.forEach((student) => {
      const option = document.createElement('option');
      option.value = student.id;
      option.textContent = student.name;
      studentSelector.appendChild(option);
    });
  } catch (error) {
    console.error(error);
    alert('Erro ao carregar a lista de estudantes.');
  }
}

async function login() {
  const loginResponse = await fetch(`${apiUrl}/user/authenticate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'test 8',
      password: 'N4Y2Cbhue',
    }),
  });

  if (!loginResponse.ok) {
    throw new Error('Erro ao realizar login.');
  }

  const { token } = await loginResponse.json();

  return token;
}

async function loginAndFetchData(studentId) {
  try {
    const token = await login();
    const overloadResponse = await fetch(`${apiUrl}/overload/${studentId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!overloadResponse.ok) {
      throw new Error('Erro ao buscar dados de sobrecarga.');
    }

    const overloadData = await overloadResponse.json();
    console.log(overloadData);
    const studentResponse = await fetch(`${apiUrl}/student/${studentId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!studentResponse.ok) {
      throw new Error('Erro ao buscar dados de estudante.');
    }

    const studentData = await studentResponse.json();
    renderCalendar(overloadData, studentData);
  } catch (error) {
    console.error(error);
    alert('Erro ao carregar dados. Verifique o console para mais detalhes.');
  }
}

function renderCalendar(overloadData, studentData) {
  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const calendar = document.getElementById('calendar');
  calendar.innerHTML = ''; // Limpa o calendário anterior

  const titulo = document.getElementById('titulo');
  titulo.textContent = `Calendário ${new Date().getFullYear()} de Sobrecarga do aluno: ${studentData.name}`;

  overloadData.forEach(({ month, days }) => {
    const monthDiv = document.createElement('div');
    monthDiv.className = 'month';

    const monthTitle = document.createElement('h2');
    monthTitle.textContent = monthNames[month - 1];
    monthDiv.appendChild(monthTitle);

    const daysGrid = document.createElement('div');
    daysGrid.className = 'days';

    days.forEach((hours, dayIndex) => {
      if (dayIndex === 0) return;

      const dayDiv = document.createElement('div');
      dayDiv.className = 'day';
      dayDiv.textContent = dayIndex;

      if (hours === 0) {
        dayDiv.classList.add('none');
        dayDiv.title = 'Sem sobrecarga';
      }
      if (hours > 0 && hours <= 1) {
        dayDiv.classList.add('low');
        dayDiv.title = `Baixo: ${hours} horas`;
      } else if (hours > 1 && hours <= 2) {
        dayDiv.classList.add('medium');
        dayDiv.title = `Média: ${hours} horas`;
      } else if (hours > 2 && hours <= 3) {
        dayDiv.classList.add('high');
        dayDiv.title = `Alta: ${hours} horas`;
      } else if (hours > 3) {
        dayDiv.classList.add('very-high');
        dayDiv.title = `Altíssima: ${hours} horas`;
      }

      daysGrid.appendChild(dayDiv);
    });

    monthDiv.appendChild(daysGrid);
    calendar.appendChild(monthDiv);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Seleciona o modal e o botão de fechar
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const closeButton = document.querySelector('.close');

  // Adiciona evento de clique nos dias do calendário
  document
    .getElementById('calendar')
    .addEventListener('click', async (event) => {
      if (event.target.classList.contains('day')) {
        const day = event.target.textContent.padStart(2, '0');
        const month = event.target
          .closest('.month')
          .querySelector('h2').textContent;
        const studentId = document.getElementById('student-selector').value;

        if (!studentId) {
          alert('Selecione um estudante antes de visualizar os detalhes.');
          return;
        }

        const monthMap = {
          Janeiro: '01',
          Fevereiro: '02',
          Março: '03',
          Abril: '04',
          Maio: '05',
          Junho: '06',
          Julho: '07',
          Agosto: '08',
          Setembro: '09',
          Outubro: '10',
          Novembro: '11',
          Dezembro: '12',
        };

        const formattedDate = `2025-${monthMap[month]}-${day}`;

        try {
          const token = await login();
          const response = await fetch(
            `${apiUrl}/overload/day-detail/${studentId}?date=${formattedDate}`,
            {
              method: 'GET',
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          if (!response.ok) throw new Error('Erro ao buscar detalhes do dia.');

          const data = await response.json();

          modalBody.innerHTML = data.length
            ? data
                .map(
                  (d) =>
                    `<p><strong>${d.subject}</strong>: ${d.activity} (Professor: ${d.teacher_name}) - ${d.overload_this_day}h</p>`,
                )
                .join('')
            : '<p>Sem atividades neste dia.</p>';

          modal.style.display = 'flex';
        } catch (error) {
          console.error(error);
          alert('Erro ao carregar os detalhes.');
        }
      }
    });

  // Fecha o modal ao clicar no botão de fechar ou fora do modal
  closeButton.addEventListener('click', () => (modal.style.display = 'none'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
});
