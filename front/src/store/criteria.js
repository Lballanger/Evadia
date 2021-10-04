import create from 'zustand';

const initialCriteria = {
  populationmin: 0,
  populationmax: 100000,
  code_departement: [],
  code_region: [],
  type_ecole: [],
  type_personal_health: [],
  type_health_institution: [],
};

const criteriaStore = create((set, get) => ({
  criterias: initialCriteria,
  setCriteria: (key, value) => {
    const { criterias } = get();
    return set({
      criterias: { ...criterias, [key]: value },
    });
  },
  resetCriteria: () => set({ criterias: initialCriteria }),
}));

export default criteriaStore;
