import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPFI, spfi, SPFx } from "@pnp/sp";
import { SPPermission } from "@microsoft/sp-page-context";
import { IHelloWorldState } from './IHelloWorldState';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/batching";
import "@pnp/sp/sites";
export default class HelloWorld extends React.Component<IHelloWorldProps, IHelloWorldState> {
  private async fetchData() {
    debugger;
    var spWeb: SPFI;
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('site')) {
      spWeb = spfi(searchParams.get('site')).using(SPFx(this.props.context));

    } else {
      spWeb = spfi().using(SPFx(this.props.context));
    }
    await spWeb.web().then(wi => {
      debugger;
      this.setState((current) => ({ ...current, webInfo: wi }));
      const [batchedSP, execute] = spWeb.batched();
      batchedSP.web()
        .then((batchweb) => {
          debugger;
          this.setState((current) => ({ ...current, webInfoBatch: batchweb }));
        }).catch((e) => {
          console.log(e);
          debugger;
        });
      execute();
    })
      .catch((e) => {
        debugger;
      });


  };

  constructor(props: IHelloWorldProps) {
    super(props);
    this.state = { webInfo: null, webInfoBatch: null };
  }
  public componentDidMount(): void {

    this.fetchData();

  }
  public render(): React.ReactElement<IHelloWorldProps> {
    return (
      <div className={styles.helloWorld}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Web nonbatched:</span>
              {this.state.webInfo ? this.state.webInfo.Title : "LOADING"}
              <span className={styles.title}>Web batched:</span>
              {this.state.webInfoBatch ? this.state.webInfoBatch.Title : "LOADING"}

            </div>
          </div>
        </div>
      </div>
    );
  }
}
