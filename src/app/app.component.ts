import { isDelegatedFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  countryDetail = {
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
                          value: '10000005',
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

  toggle(type: boolean): void {
    this.formatData(this.countryDetail.values, type);
  }

  private formatData(data: any[], type: boolean): void {
    data.forEach((res) => {
      res.show = type;
      if (res.values && res.values.length > 0) {
        this.formatData(res.values, type);
      }
    });
  }
}
