import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SortPipe } from './pipe/sort-order.pipe';
import { NumberFormatPipe } from './pipe/number-format.pipe';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, SortPipe, NumberFormatPipe],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.countryDetail = mockData;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should Expand All', () => {
    component.toggle(true);
    fixture.detectChanges();
    let getAllExpandData = fixture.debugElement.nativeNode.querySelectorAll(
      '.treeview .glyphicon-arrow-down'
    );
    let getAllCollapsedData = fixture.debugElement.nativeNode.querySelectorAll(
      '.treeview .glyphicon-arrow-right'
    );
    expect(getAllCollapsedData.length).toEqual(0);
    expect(getAllExpandData.length).toBeGreaterThan(0);
  });

  it('should Collapse All', () => {
    component.toggle(false);
    fixture.detectChanges();
    let getAllCollapsedData = fixture.debugElement.nativeNode.querySelectorAll(
      '.treeview .glyphicon-arrow-right'
    );
    let getAllExpandData = fixture.debugElement.nativeNode.querySelectorAll(
      '.treeview .glyphicon-arrow-down'
    );
    expect(getAllCollapsedData.length).toBeGreaterThan(0);
    expect(getAllExpandData.length).toEqual(0);
  });

  it('should click of parent node, should display child nodes', () => {
    component.toggle(false);
    fixture.detectChanges();
    let getAllCollapsedData = fixture.debugElement.nativeNode.querySelectorAll(
      '.treeview .glyphicon-arrow-right'
    );
    getAllCollapsedData[0].click();
    fixture.detectChanges();
    let getAllExpandData = fixture.debugElement.nativeNode.querySelectorAll(
      '.treeview .glyphicon-arrow-down'
    );
    const childNode =
      getAllExpandData[0].parentElement.nextElementSibling.innerText;
    expect(getAllExpandData.length).toBeGreaterThan(0);
    expect(childNode).toEqual('zones');
  });

  it('should contain population in readable format ', () => {
    component.toggle(true);
    fixture.detectChanges();
    let getStatePopulation = fixture.debugElement.nativeNode.querySelector(
      '.treeview .state-population'
    ).innerText;
    expect(getStatePopulation.trim()).toEqual('10 Lakhs');
    mockData.values[0].values[0].values[0].values[0].values[0].value.value =
      '100000000';
    component.countryDetail = mockData;
    component.toggle(true);
    fixture.detectChanges();
    getStatePopulation = fixture.debugElement.nativeNode.querySelector(
      '.treeview .state-population'
    ).innerText;
    expect(getStatePopulation.trim()).toEqual('10 Crores');
  });
});

const mockData = {
  name: 'countries',
  values: [
    {
      name: 'india',
      values: [
        {
          name: 'zones',
          values: [
            {
              name: 'north',
              values: [
                {
                  name: 'states',
                  values: [
                    {
                      name: 'punjab',
                      value: {
                        name: 'population',
                        value: '10000',
                      },
                    },
                    {
                      name: 'J&K',
                      value: {
                        name: 'population',
                        value: '1000000',
                      },
                    },
                    {
                      name: 'Mumbai',
                      value: {
                        name: 'population',
                        value: '10000000',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'south',
              values: [
                {
                  name: 'states',
                  values: [
                    {
                      name: 'tamil nadu',
                      value: {
                        name: 'population',
                        value: '67000000',
                      },
                    },
                    {
                      name: 'kerala',
                      value: {
                        name: 'population',
                        value: '34000000',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
