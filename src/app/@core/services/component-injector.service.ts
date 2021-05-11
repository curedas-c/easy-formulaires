import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { AdviseComponent } from '../../@shared/components/advise/advise.component';

@Injectable({
  providedIn: 'root',
})
export class ComponentInjectorService {
  adviseCompRef: ComponentRef<any>;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  public showAdvise(selector: string, type: string, center: boolean = false) {
    // 1. Create a component reference from the component
    this.adviseCompRef = this.componentFactoryResolver
      .resolveComponentFactory(AdviseComponent)
      .create(this.injector);

    // bind data to component’s inputs
    this.adviseCompRef.instance.iconType = type;
    this.adviseCompRef.instance.shouldCenter = center;

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(this.adviseCompRef.hostView);

    // 3. Get DOM element from component
    const domElem = (this.adviseCompRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    const adviseContainer = document.querySelector(selector);
    if (adviseContainer) {
      adviseContainer.appendChild(domElem);
    }
  }

  public hideAdvise() {
    this.appRef.detachView(this.adviseCompRef.hostView);
    this.adviseCompRef.destroy();
  }
}
