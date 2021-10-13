import create from 'zustand';
import { devtools } from 'zustand/middleware';

const initialCriteria = {
  populationmin: '0',
  populationmax: '100000',
  code_departement: [],
  code_region: [],
  type_ecole: [],
  type_personal_health: {
    'médecin généraliste': false,
    cardiologue: false,
    'chirurgien-dentiste': false,
    'dermatologue et vénérologue': false,
    ophtalmologiste: false,
    pédiatre: false,
    pneumologue: false,
    psychiatre: false,
    'sage-femme': false,
  },
  type_health_institution: {
    'centre hospitalier': false,
    'centre de soins': false,
    'crèche et garderie': false,
    pharmacie: false,
  },
};

const criteriaStore = create(
  devtools((set, get) => ({
    criterias: initialCriteria,
    setCriteria: (key, value) => {
      const { criterias } = get();
      return set({
        criterias: { ...criterias, [key]: value },
      });
    },
    resetCriteria: () => set({ criterias: initialCriteria }),
  }))
);

export default criteriaStore;
