import { Organization } from './organization.entity';

describe('Organization entity', () => {
  it('cria ativa com CNPJ válido', () => {
    const org = Organization.create({
      tenantId: 'tenant-1',
      legalName: 'Walletz Med LTDA',
      tradeName: 'Walletz Med',
      cnpjDigits: '12345678000195',
      taxProfile: 'SIMPLES_NACIONAL',
      regionalConfigId: 'region-br-sp',
    });
    expect(org.status).toBe('ACTIVE');
    expect(org.rowVersion).toBe(1);
    expect(org.legalName).toBe('Walletz Med LTDA');
  });

  it('rejeita CNPJ com menos de 14 dígitos', () => {
    expect(() =>
      Organization.create({
        tenantId: 'tenant-1',
        legalName: 'X',
        tradeName: 'X',
        cnpjDigits: '1234',
        taxProfile: 'MEI',
        regionalConfigId: 'region-1',
      }),
    ).toThrow('CNPJ deve conter exatamente 14 dígitos numéricos.');
  });

  it('incrementa rowVersion a cada update', () => {
    const org = Organization.create({
      tenantId: 'tenant-1',
      legalName: 'Razão Social',
      tradeName: 'Nome Fantasia',
      cnpjDigits: '12345678000195',
      taxProfile: 'LUCRO_PRESUMIDO',
      regionalConfigId: 'region-1',
    });
    org.update({ legalName: 'Nova Razão Social' }, 1);
    expect(org.rowVersion).toBe(2);
    expect(org.legalName).toBe('Nova Razão Social');
  });

  it('lança conflito de versão se rowVersion divergir', () => {
    const org = Organization.create({
      tenantId: 'tenant-1',
      legalName: 'X',
      tradeName: 'X',
      cnpjDigits: '12345678000195',
      taxProfile: 'MEI',
      regionalConfigId: 'region-1',
    });
    expect(() => org.update({ legalName: 'Y' }, 99)).toThrow('Conflito de versão');
  });
});
