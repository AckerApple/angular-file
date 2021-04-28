export const string = "<style>"+
"\n  .my-drop-zone { border: dotted 3px lightgray; }"+
"\n  /* Default class applied to drop zones on over */"+
"\n  .invalid-drag { border: dotted 3px red; }"+
"\n  .valid-drag { border: dotted 3px green; }"+
"\n  html, body { height: 100%; }"+
"\n  .previewIcon{"+
"\n    width:100px;height:100px;"+
"\n    background-size:cover;"+
"\n    background-repeat:no-repeat;"+
"\n  }"+
"\n"+
"\n  .inline-block{"+
"\n    display:inline-block;"+
"\n  }"+
"\n"+
"\n  .margin {margin:.15em;padding:.15em;}"+
"\n"+
"\n  .flex {display:flex;}"+
"\n  .flex-wrap {display:flex;flex-wrap:wrap}"+
"\n</style>"+
"\n"+
"\n<ngfFormData"+
"\n  [files]      = \"files\""+
"\n  postName     = \"file\""+
"\n  [(FormData)] = \"sendableFormData\""+
"\n></ngfFormData>"+
"\n"+
"\n<ngfUploadStatus"+
"\n  [(percent)] = \"progress\""+
"\n  [httpEvent] = \"httpEvent\""+
"\n></ngfUploadStatus>"+
"\n"+
"\n"+
"\n<h3>Select Files</h3>"+
"\n<div class=\"flex-wrap margin\">"+
"\n  <div class=\"flex-wrap\">"+
"\n    <div class=\"margin\">"+
"\n      Multiple"+
"\n      <div class=\"flex margin\" style=\"border:1px solid #555;border-radius: 5px;\">"+
"\n        <input"+
"\n          ngfSelect"+
"\n          multiple"+
"\n          type      = \"file\""+
"\n          [(files)] = \"files\""+
"\n          [accept]  = \"accept\""+
"\n          [maxSize]  = \"maxSize\""+
"\n          [(lastInvalids)] = \"lastInvalids\""+
"\n          (filesChange) = \"lastFileAt=getDate()\""+
"\n          capturePaste = \"1\""+
"\n        />"+
"\n        <button *ngIf=\"files.length\" type=\"button\" (click)=\"files.length = 0\">clear</button>"+
"\n      </div>"+
"\n    </div>"+
"\n"+
"\n    <div class=\"margin\">"+
"\n      Single"+
"\n      <div class=\"flex margin\" style=\"border:1px solid #555;border-radius: 5px;\">"+
"\n        <input"+
"\n          ngfSelect"+
"\n          type       = \"file\""+
"\n          [(files)]  = \"files\""+
"\n          [accept]   = \"accept\""+
"\n          [maxSize]  = \"maxSize\""+
"\n          [(lastInvalids)] = \"lastInvalids\""+
"\n          (filesChange) = \"lastFileAt=getDate()\""+
"\n        />"+
"\n        <button *ngIf=\"files.length\" type=\"button\" (click)=\"files.length = 0\">clear</button>"+
"\n      </div>"+
"\n    </div>"+
"\n"+
"\n    <div class=\"inline-block margin\">"+
"\n      Element"+
"\n      <div"+
"\n        ngfSelect"+
"\n        multiple  = \"1\""+
"\n        [accept]  = \"accept\""+
"\n        [maxSize] = \"maxSize\""+
"\n        [(files)] = \"files\""+
"\n        class     = \"well my-drop-zone\""+
"\n        style     = \"border-style:groove;padding:0.5em;text-align:center;width:150px;\""+
"\n        [(lastInvalids)] = \"lastInvalids\""+
"\n        (filesChange) = \"lastFileAt=getDate()\""+
"\n      >"+
"\n        Tap to Select"+
"\n      </div>"+
"\n    </div>"+
"\n"+
"\n    <div class=\"inline-block margin\">"+
"\n      <strong>Images</strong> Only"+
"\n      <div"+
"\n        ngfSelect"+
"\n        accept    = \"image/*\""+
"\n        multiple  = \"1\""+
"\n        [maxSize] = \"maxSize\""+
"\n        [(files)] = \"files\""+
"\n        class     = \"well my-drop-zone\""+
"\n        style     = \"border-style:groove;padding:0.5em;text-align:center;width:150px;\""+
"\n        [(lastInvalids)] = \"lastInvalids\""+
"\n        (filesChange) = \"lastFileAt=getDate()\""+
"\n      >"+
"\n        Tap to Select"+
"\n      </div>"+
"\n    </div>"+
"\n  </div>"+
"\n</div>"+
"\n"+
"\n<div>"+
"\n  <h3>Drop Files</h3>"+
"\n  <div class=\"inline-block margin\">"+
"\n    <div"+
"\n      ngfDrop"+
"\n      [(validDrag)]    = \"baseDropValid\""+
"\n      (fileOver)       = \"hasBaseDropZoneOver=$event\""+
"\n      [(files)]        = \"files\""+
"\n      [accept]         = \"accept\""+
"\n      [maxSize]        = \"maxSize\""+
"\n      [(dragFiles)]    = \"dragFiles\""+
"\n      [(lastInvalids)] = \"lastInvalids\""+
"\n      class            = \"well my-drop-zone\""+
"\n      [class.invalid-drag] = \"baseDropValid===false\""+
"\n      [class.valid-drag]   = \"baseDropValid\""+
"\n      (filesChange) = \"lastFileAt=getDate()\""+
"\n      [fileDropDisabled] = \"fileDropDisabled\""+
"\n    >"+
"\n      Base drop zone"+
"\n    </div>"+
"\n    <strong>accept:</strong>"+
"\n    <div>"+
"\n      <input type=\"text\" [(ngModel)]=\"accept\" />"+
"\n    </div>"+
"\n  </div>"+
"\n"+
"\n  <div class=\"inline-block margin\">"+
"\n    <div"+
"\n      ngfDrop"+
"\n      multiple         = \"1\""+
"\n      selectable       = \"1\""+
"\n      [(validDrag)]    = \"validComboDrag\""+
"\n      [(files)]        = \"files\""+
"\n      accept           = \"image/*\""+
"\n      [maxSize]        = \"maxSize\""+
"\n      [(lastInvalids)] = \"lastInvalids\""+
"\n      [(dragFiles)]    = \"dragFiles\""+
"\n      class            = \"well my-drop-zone\""+
"\n      [class.invalid-drag] = \"validComboDrag===false\""+
"\n      [class.valid-drag]   = \"validComboDrag\""+
"\n      (filesChange) = \"lastFileAt=getDate()\""+
"\n      [fileDropDisabled] = \"fileDropDisabled\""+
"\n    >"+
"\n      Combo drop/select <strong>image</strong> only zone"+
"\n    </div>"+
"\n    <strong>accept:</strong>"+
"\n    <div>"+
"\n      <input type=\"text\" value=\"image/*\" disabled readonly=\"\" style=\"width:100%\" />"+
"\n    </div>"+
"\n  </div>"+
"\n"+
"\n  <div class=\"inline-block margin\">"+
"\n    <strong>maxSize byte</strong>"+
"\n    <div>"+
"\n      <input type=\"number\" [(ngModel)]=\"maxSize\" placeholder=\"1024 == 1mb\" />"+
"\n    </div>"+
"\n  </div>"+
"\n"+
"\n  <div class=\"inline-block margin\">"+
"\n    <strong>fileDropDisabled</strong>"+
"\n    <div>"+
"\n      <input type=\"checkbox\" [(ngModel)]=\"fileDropDisabled\" name=\"fileDropDisabled\" id=\"fileDropDisabled\" />"+
"\n    </div>"+
"\n  </div>"+
"\n</div>"+
"\n"+
"\n"+
"\n<div *ngIf=\"dragFiles\">"+
"\n  <h3 style=\"margin:0\">Drag Files</h3>"+
"\n  <p *ngIf=\"!dragFiles.length\" style=\"color:red;\">"+
"\n    This browser does NOT release metadata for files being dragged. All files will be considered valid drags until dropped."+
"\n  </p>"+
"\n  <pre>{{ dragFiles | json }}</pre>"+
"\n</div>"+
"\n"+
"\n<div class=\"bg-warning\" *ngIf=\"lastInvalids?.length\" style=\"margin-bottom: 40px\">"+
"\n  <h3 style=\"color:red;\">Last {{ lastInvalids.length }} Invalid Selected Files</h3>"+
"\n"+
"\n  <table class=\"table\">"+
"\n    <thead>"+
"\n      <tr>"+
"\n        <th>Name</th>"+
"\n        <th>Error</th>"+
"\n        <th>Type</th>"+
"\n        <th>Size</th>"+
"\n        <th>Actions</th>"+
"\n      </tr>"+
"\n    </thead>"+
"\n    <tbody>"+
"\n      <tr *ngFor=\"let item of lastInvalids;let i=index\">"+
"\n        <td>"+
"\n          <div *ngIf=\"['image/gif','image/png','image/jpeg'].indexOf(item.file.type)>=0\">"+
"\n            <div class=\"previewIcon\" [ngfBackground]=\"item.File\"></div>"+
"\n          </div>"+
"\n          <strong>{{ item.file.name }}</strong>"+
"\n        </td>"+
"\n        <td nowrap>"+
"\n          {{ item.type }}"+
"\n        </td>"+
"\n        <td nowrap>"+
"\n          {{ item.file.type }}"+
"\n        </td>"+
"\n        <td nowrap>"+
"\n          {{ item.file.size/1024/1024 | number:'.2' }} MB"+
"\n        </td>"+
"\n        <td nowrap>"+
"\n          <button type=\"button\""+
"\n            class=\"btn btn-danger btn-xs\""+
"\n            (click)=\"lastInvalids.splice(i,1)\""+
"\n          >"+
"\n            <span class=\"glyphicon glyphicon-trash\"></span>"+
"\n          </button>"+
"\n        </td>"+
"\n      </tr>"+
"\n    </tbody>"+
"\n  </table>"+
"\n</div>"+
"\n"+
"\n<div style=\"margin-bottom: 40px\">"+
"\n  <h3>{{ files.length }} Queued Files</h3>"+
"\n  <table class=\"table\">"+
"\n    <thead>"+
"\n      <tr>"+
"\n        <th>Name</th>"+
"\n        <th>Type</th>"+
"\n        <th>Size</th>"+
"\n        <th>Actions</th>"+
"\n      </tr>"+
"\n    </thead>"+
"\n    <tbody>"+
"\n      <tr *ngFor=\"let item of files;let i=index\">"+
"\n        <td>"+
"\n          <div *ngIf=\"['image/gif','image/png','image/jpeg'].indexOf(item.type)>=0\">"+
"\n            <div class=\"previewIcon\" [ngfBackground]=\"item\"></div>"+
"\n          </div>"+
"\n          <strong>{{ item.name }}</strong>"+
"\n        </td>"+
"\n        <td nowrap>"+
"\n          {{ item.type }}"+
"\n        </td>"+
"\n        <td nowrap>"+
"\n          {{ item.size/1024/1024 | number:'.2' }} MB"+
"\n        </td>"+
"\n        <td nowrap>"+
"\n          <button type=\"button\""+
"\n            class=\"btn btn-danger btn-xs\""+
"\n            (click)=\"files.splice(i,1)\""+
"\n          >"+
"\n            <span class=\"glyphicon glyphicon-trash\"></span>"+
"\n          </button>"+
"\n        </td>"+
"\n      </tr>"+
"\n    </tbody>"+
"\n  </table>"+
"\n"+
"\n  <div>"+
"\n    <div>"+
"\n      Queue progress:"+
"\n      <div class=\"progress\" style=\"\">"+
"\n        <div class=\"progress-bar\""+
"\n          role=\"progressbar\""+
"\n          [ngStyle]=\"{ 'width': progress + '%' }\""+
"\n        ></div>"+
"\n      </div>"+
"\n    </div>"+
"\n"+
"\n    <ng-container *ngIf=\"lastFileAt\">"+
"\n      <p>"+
"\n        <strong>Last file(s) selected At:</strong> {{ lastFileAt | date : 'longTime' }}"+
"\n      </p>"+
"\n    </ng-container>"+
"\n"+
"\n    <ng-container *ngIf=\"progress==100\">"+
"\n      <i class=\"glyphicon glyphicon-ok\"></i>"+
"\n      &nbsp;Upload Complete"+
"\n    </ng-container>"+
"\n"+
"\n    <button type=\"button\""+
"\n      class=\"btn btn-success btn-s\""+
"\n      (click)=\"uploadFiles()\""+
"\n      [disabled]=\"!files.length\""+
"\n    >"+
"\n      <span class=\"glyphicon glyphicon-upload\"></span> Upload all"+
"\n    </button>"+
"\n"+
"\n    <button type=\"button\""+
"\n      class=\"btn btn-warning btn-s\""+
"\n      (click)=\"cancel()\""+
"\n      [disabled]=\"!httpEmitter\""+
"\n    >"+
"\n      <span class=\"glyphicon glyphicon-ban-circle\"></span> Cancel all"+
"\n    </button>"+
"\n    <button type=\"button\""+
"\n      class=\"btn btn-danger btn-s\""+
"\n      (click)=\"files.length=0\""+
"\n      [disabled]=\"!files.length\""+
"\n    >"+
"\n      <span class=\"glyphicon glyphicon-trash\"></span> Remove all"+
"\n    </button>"+
"\n  </div>"+
"\n</div>"+
"\n"