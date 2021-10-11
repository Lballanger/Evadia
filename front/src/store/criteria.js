import create from 'zustand';
import { devtools } from 'zustand/middleware';

const initialCriteria = {
  populationmin: 0,
  populationmax: 100000,
  code_departement: [],
  code_region: [],
  type_ecole: [],
  type_personal_health: {
    doctor: false,
    cardiologistic: false,
    dentist: false,
    dermatologist: false,
    ophtalmologist: false,
    pediatrician: false,
    pulmonologist: false,
    psychiatrist: false,
    midwife: false,
  },
  type_health_institution: {
    hospital: false,
    healthCenter: false,
    nursery: false,
    pharmacy: false,
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
